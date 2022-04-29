import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/lib/interfaces/modules/module";
import { module } from "~/lib/integrated-modules/home/home";
import appDispatcher from "~src/dispatcher";

export class LoadedModuleStore extends BaseStore<Module> {
	constructor() {
		super(module);
		appDispatcher.bind("select_module", this.set)
	}

	public async init(): Promise<void> {
		return;
	}
}
