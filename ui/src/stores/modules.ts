import { Module } from "~/lib/interfaces/modules/module";
import { BaseStore } from "~/lib/stores/store";
import { Component } from "~/lib/components/component.I";
import { FullStores } from "~src/full-stores";
import { FullActions } from "~src/full-actions";

export class ModulesStore extends BaseStore<Module[]> {
	constructor(protected fullActions: FullActions, protected fullStores: FullStores, integratedModules: Module[]) {
		super(integratedModules);
	}

	public async init(): Promise<void> {
		const res = await fetch("/api/v1/modules");
		const raw_modules = await res.json();

		let i = this.value.length;

		const modules: Module[] = [];
		const promisesModules: (Promise<any> | undefined)[] = [];

		for (const raw_mod of raw_modules) {
			if (raw_mod.id === undefined) {
				continue;
			}
			if (!raw_mod.name === undefined) {
				continue;
			}
			if (!raw_mod.description === undefined) {
				continue;
			}

			const mod: Module = {
				id: i,
				name: raw_mod.name,
				component: {} as Component,
				fetching: {
					id: raw_mod.id,
					origin: "/api/v1/modules",
				},
				error: {
					state: "warning",
					msg: "No origin to load module!",
				},
			};

			modules.push(mod);

			if (raw_mod.origin) {
				if (!mod.fetching)
					mod.fetching = {
						id: raw_mod.id,
						origin: "n/a",
					};

				mod.fetching.origin = raw_mod.origin;

				promisesModules.push(import(raw_mod.origin));
			} else {
				promisesModules.push(undefined);
			}

			i++;
		}

		const results = await Promise.allSettled(promisesModules);

		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const mod = modules[i];

			if (result.status === "rejected") {
				mod.error = {
					state: "error",
					msg: `Unable to load module "${mod.name}" from origin "${
						(mod.fetching || { origin: "n/a" }).origin
					}" with error: ${result.reason}`,
				};
				continue;
			}

			const m = result.value;

			if (m.init) {
				const initResult = await m.init(this.fullActions, this.fullStores);

				if (initResult.component) {
					mod.component = initResult.component;

					mod.error = undefined;
					if (initResult.css) {
						const element = document.createElement("link");

						element.setAttribute("href", initResult.css);
						element.setAttribute("type", "text/css");
						element.setAttribute("rel", "stylesheet");

						document.head.append(element);

						if (mod.fetching) {
							mod.fetching.css = initResult.css;
						}
					}
				}

				if (initResult.actionCreator) {
					this.fullActions.set(mod.name, initResult.actionCreator);
				}

				if (initResult.storeManager) {
					this.fullStores.set(mod.name, initResult.storeManager);
				}
			} else {
				if (m !== undefined) {
					mod.error = {
						state: "error",
						msg: `Unable to find init function in module "${mod.name}"!`,
					};
				}
			}

			this.value.push(mod);
		}

		this.refresh();
	}
}
