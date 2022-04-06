import { Module } from "./stores.I";
import { BaseStore } from "../lib/stores/store";
import { Settings } from "../lib/components/settings";

class ModulesStore extends BaseStore<Module[]> {
	constructor() {
		super([{ id: -1, order: -1, name: "Settings", description: "Your settings", component: new Settings(), state: "nothing" }]);
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
				order: raw_mod.id,
				name: raw_mod.name,
				description: raw_mod.description,
				state: "warning",
				msg: "No path to load the module",
			};

			if (raw_mod.path) {
				try {
					const m = await import(raw_mod.path);

					if (m.component) {
						mod.state = "nothing";
						mod.msg = undefined;

						mod.component = m.component;
					}
					else {
						mod.state = "error";
						mod.msg = `No component for: ${raw_mod.name}`;
					}
				} catch {
					mod.state = "error";
					mod.msg = `Unable to load module: ${raw_mod.name}`;
				}
			}

			i++
			this.value.push(mod);
			this.refresh()
		}
	}
}

const s = new ModulesStore();
s.init();

export default s;
