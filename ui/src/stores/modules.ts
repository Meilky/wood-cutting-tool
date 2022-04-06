import { Module } from "~/src/interfaces/modules/module";
import { BaseStore } from "~/lib/stores/store";
import { Settings } from "~/src/components/settings";
import { Component } from "~/lib/components/component.I";

class ModulesStore extends BaseStore<Module[]> {
	constructor() {
		super([
			{
				id: 0,
				name: "Settings",
				description: "The settings for you",
				component: new Settings(),
			},
		]);
	}

	public async init(): Promise<void> {
		const res = await fetch("/api/modules");
		const raw_modules = await res.json();

		let i = this.value.length;
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
				description: raw_mod.description,
				component: {} as Component,
				fetching: {
					id: raw_mod.id,
					origin: "/api/modules"
				},
				error: {
					state: "warning",
					msg: "No origin to load module!",
				}
			};

			if (raw_mod.origin) {
				try {
					const m = await import(raw_mod.origin);

					if (m.component) {
						mod.error = undefined;
						mod.component = m.component;
					} else {
						mod.error = {
							state: "error",
							msg: `Unable to find component in module "${raw_mod.name}" from origin "${raw_mod.origin}"!`,
						}
					}
				} catch {
					mod.error = {
						state: "error",
						msg: `Unable to load module "${raw_mod.name}" from origin "${raw_mod.origin}"!`,
					}
				}
			}

			this.value.push(mod);
			this.refresh();

			i++;
		}
	}
}

const s = new ModulesStore();
s.init();

export default s;
