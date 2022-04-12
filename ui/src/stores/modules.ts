import { Module } from "~/src/interfaces/modules/module";
import { BaseStore } from "~/lib/stores/store";
import { module } from "~/src/modules/home/home";
import { Component } from "~/lib/components/component.I";

class ModulesStore extends BaseStore<Module[]> {
	constructor() {
		super([
			module
		]);
	}

	public async init(): Promise<void> {
		const res = await fetch("/api/v1/modules");
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
						};
					}

					if (m.css) {
						const element = document.createElement("link");
						element.setAttribute("href", m.css)
						element.setAttribute("type", "text/css")
						element.setAttribute("rel", "stylesheet")
						document.head.append(element)
						if (mod.fetching) {
							mod.fetching.css = m.css;
						}
					}
				} catch (e) {
					mod.error = {
						state: "error",
						msg: `Unable to load module "${raw_mod.name}" from origin "${raw_mod.origin}" with error: ${e}`,
					};
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
