import { Module } from "~/lib/interfaces/modules/module";
import { BaseStore } from "~/lib/stores/store";
import { Component } from "~/lib/components/component.I";
import { FullManager } from "~lib/interfaces/full-manager";

export class ModulesStore extends BaseStore<Module[]> {
	constructor(protected fullActions: FullManager<{ [key: string]: any }>, protected fullStores: FullManager<{ [key: string]: any }>, protected integratedModules: { module: Module, init: (fullActions: FullManager<{ [key: string]: any }>, fullStores: FullManager<{ [key: string]: any }>) => void }[]) {
		super([]);
	}

	public async init(): Promise<void> {
		let i = this.value.length;

		const modules: Module[] = [];
		const promisesModules: any[] = [];

		for (const raw_mod of this.integratedModules) {
			modules.push(raw_mod.module)
			promisesModules.push(raw_mod);
			i++
		}

		try {
			const res = await fetch("/api/v1/modules");
			const raw_modules = await res.json();


			for (const raw_mod of raw_modules) {
				const mod = this.initModule(i, raw_mod);

				if (mod && mod.fetching) {
					modules.push(mod)
					promisesModules.push(import(mod.fetching.origin))
				}

				i++
			}
		} catch {
			console.error("Unable to fetch repo origin!")
		}

		const results = await Promise.allSettled(promisesModules);

		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const mod = modules[i];

			if (result.status === "rejected") {
				mod.error = {
					state: "error",
					msg: `Unable to load module "${mod.name}" from origin "${(mod.fetching || { origin: "n/a" }).origin}" with error: ${result.reason}`,
				};

				continue;
			}

			const m = result.value;

			if (m && m.init) {
				try {
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
				} catch (e: any) {
					mod.error = {
						state: "error",
						msg: `Error while loading module "${e}"!`,
					};
				}

				this.value.push(mod);
			} else {
				if (mod !== undefined) {
					mod.error = {
						state: "error",
						msg: `Unable to find init function in module "${mod.name}"!`,
					};

					this.value.push(mod);
				}
			}
		}

		this.refresh();
	}

	protected initModule(id: number, raw_mod: any): Module | undefined {
		if (!raw_mod.id === undefined) {
			return;
		}

		if (!raw_mod.name === undefined) {
			return;
		}

		if (!raw_mod.description === undefined) {
			return;
		}

		const mod: Module = {
			id,
			name: raw_mod.name,
			component: {} as Component,
			fetching: {
				id: raw_mod.id,
				origin: "n/a",
			},
			error: {
				state: "warning",
				msg: "No origin to load module!",
			},
		};

		if (!raw_mod.origin) {
			return;
		}

		if (!mod.fetching) {
			mod.fetching = {
				id: raw_mod.id,
				origin: "n/a",
			};
		}

		mod.fetching.origin = raw_mod.origin;

		return mod;
	}
}
