import { StoreManager } from "~/lib/interfaces/store-manager";
import { ConfigStore } from "./stores/config";
import { LoadedModuleStore } from "./stores/loaded-module";
import { ModulesStore } from "./stores/modules";

export interface AppStores {
	config: ConfigStore;
	modules: ModulesStore;
	loadedModule: LoadedModuleStore
}

export class AppStoreManager implements StoreManager<AppStores> {
	public readonly stores: AppStores;

	constructor() {
		this.stores = {
			config: new ConfigStore(),
			modules: new ModulesStore(),
			loadedModule: new LoadedModuleStore(),
		};
	}

	public async init(): Promise<void> {
		const promises = [];

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof AppStores].init());
		}

		const result = await Promise.allSettled(promises);

		for (const res of result) {
			if (res.status === "rejected") {
				console.error("Error loding a store in main login store manager: ", res.reason);
			}
		}
	}
}

export default new AppStoreManager();
