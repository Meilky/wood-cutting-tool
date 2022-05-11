import { Module } from "~lib/interfaces/modules/module";
import { Store } from "~lib/interfaces/stores/store";
import { Config } from "~lib/interfaces/modules/app/models/config";

export interface PublicStores {
	config: Store<Config>;
	modules: Store<Module[]>;
}
