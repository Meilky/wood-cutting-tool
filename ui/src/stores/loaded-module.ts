import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/lib/interfaces/modules/module";
import { module } from "~/lib/integrated-modules/home/home";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "~src/interfaces/actions";

export class LoadedModuleStore extends BaseStore<Module> {
	constructor(dispatcher: Dispatcher<PrivateActions>) {
		super(module);
		dispatcher.bind("select_module", this.set);
	}

	public async init(): Promise<void> {
		return;
	}
}
