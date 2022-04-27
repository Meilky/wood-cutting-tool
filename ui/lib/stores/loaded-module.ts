import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/lib/interfaces/modules/module";
import { module } from "~/lib/integrated-modules/home/home";

export class LoadedModuleStore extends BaseStore<Module> {
	constructor() {
		super(module);
	}

	public async init(): Promise<void> {
		return;
	}
}
