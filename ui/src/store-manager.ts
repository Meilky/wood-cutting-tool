import { StoreManager } from "~/lib/interfaces/store-manager";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { FullAppActionsManager } from "./full-action-manager";
import { FullAppStoresManager } from "./full-store-manager";
import { PrivateActions } from "./interfaces/actions";
import { ConfigStore } from "./stores/config";
import { LoadedModuleStore } from "./stores/loaded-module";
import { ModulesStore } from "./stores/modules";
import { Home } from "~/src/integrated-modules/home/components/home";
import { Module } from "~/lib/interfaces/modules/module";

export interface PrivateStores {
	config: ConfigStore;
	modules: ModulesStore;
	loadedModule: LoadedModuleStore;
}

export class PrivateStoreManager implements StoreManager<PrivateStores> {
	public readonly stores: PrivateStores;

	constructor(
		fullActionManager: FullAppActionsManager,
		fullStoreManager: FullAppStoresManager,
		dispatcher: Dispatcher<PrivateActions>
	) {
		const home: Module = {
			id: 0,
			name: "Home",
			component: new Home(),
		};

		this.stores = {
			config: new ConfigStore(),
			modules: new ModulesStore(fullActionManager, fullStoreManager),
			loadedModule: new LoadedModuleStore(dispatcher),
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
