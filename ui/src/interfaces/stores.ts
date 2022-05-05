import { Module } from "~lib/interfaces/modules/module";
import { Store } from "~lib/interfaces/stores/store";
import { Config } from "~src/interfaces/stores/config";

export interface PrivateStores extends PublicStores {
	loadedModule: Store<Module | undefined>;
}

export interface PublicStores {
	config: Store<Config>;
	modules: Store<Module[]>;
}
