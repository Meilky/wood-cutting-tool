import { StoreManager } from "~/lib/interfaces/store-manager";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "./interfaces/actions";
import { ConfigStore } from "./stores/config";
import { LoadedModuleStore } from "./stores/loaded-module";
import { ModulesStore } from "./stores/modules";
import { PrivateStores } from "./interfaces/stores";
import { FullManager } from "~lib/interfaces/full-manager";
import { Module } from "~lib/interfaces/modules/module";
import { Home } from "~/src/integrated-modules/home/components/home";

export class PrivateStoresManager implements StoreManager<PrivateStores> {
	public readonly stores: PrivateStores;

	constructor(
		fullActions: FullManager<{ [key: string]: any }>,
		fullStores: FullManager<{ [key: string]: any }>,
		dispatcher: Dispatcher<PrivateActions>
	) {
		const integratedModules: Module[] = [
			{
				id: 0,
				name: "Home",
				component: new Home(),
			},
		];

		this.stores = {
			config: new ConfigStore(),
			modules: new ModulesStore(fullActions, fullStores, integratedModules),
			loadedModule: new LoadedModuleStore(dispatcher, integratedModules[0]),
		};
	}

	public async init(): Promise<void> {
		const promises = [];

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof PrivateStores].init());
		}

		const result = await Promise.allSettled(promises);

		for (const res of result) {
			if (res.status === "rejected") {
				console.error("Error loding a store in main login store manager: ", res.reason);
			}
		}
	}
}
