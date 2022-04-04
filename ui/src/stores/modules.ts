import { Module } from "./stores.I";
import { BaseStore } from "../lib/stores/store";

class ModulesStore extends BaseStore<Module[]> {
	constructor() {
		super([{ id:0, name: "Settings", description: "Your settings" }]);
	}

	public async init(): Promise<void> {
		const res = await fetch("/api/modules");
		const modules = await res.json();

		this.value = modules;
	}
}

const s = new ModulesStore();
s.init();

export default s;
