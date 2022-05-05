import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/lib/interfaces/modules/module";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "~src/interfaces/actions";

export class LoadedModuleStore extends BaseStore<Module | undefined> {
	constructor(dispatcher: Dispatcher<PrivateActions>, defaultModule: Module) {
		super(defaultModule);

		dispatcher.bind("select_module", this.set);
	}

	public async init(): Promise<void> {
		return;
	}
}
