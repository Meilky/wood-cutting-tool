import { BaseStore } from "~/lib/stores/store";
import { Module } from "~/src/interfaces/modules/module";
import { Component } from "~/lib/components/component.I";

class LoadedModuleStore extends BaseStore<Module> {
	constructor() {
		super({
			id: -100,
			name: "default module",
			description: "default module",
			component: {} as Component,
			error: {
				state: "warning",
				msg: "default module",
			},
		});
	}

	public init(): void {
		return;
	}
}

export default new LoadedModuleStore();
