import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/src/interfaces/modules/module";
import { module } from "~/src/modules/home/home";

class LoadedModuleStore extends BaseStore<Module> {
	constructor() {
		super(module);
	}

	public async init(): Promise<void> {
		return;
	}
}

export default new LoadedModuleStore();
