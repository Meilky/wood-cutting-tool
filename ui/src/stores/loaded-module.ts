import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/src/interfaces/modules/module";
import { module } from "~/src/integrated-modules/home/home";

export class LoadedModuleStore extends BaseStore<Module> {
	constructor() {
		super(module);
	}

	public async init(): Promise<void> {
		return;
	}
}
