import { ModulesStore } from "./stores/modules"
import { StoreManager } from "~/lib/interfaces/store-manager"
import { ConfigStore } from "~/lib/stores/config"
import { LoadedModuleStore } from "~/lib/stores/loaded-module"

export interface DefaultStores {
	modules: ModulesStore,
	config: ConfigStore,
	loadedModule: LoadedModuleStore
}

export class DefaultStoreManager implements StoreManager<DefaultStores> {
	public readonly stores: DefaultStores;

	constructor() {
		this.stores = {
			modules: new ModulesStore(),
			config: new ConfigStore(),
			loadedModule: new LoadedModuleStore()
		}
	}

	public async init(): Promise<void> {
		const promises = []

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof DefaultStores].init())
		}

		const result = await Promise.allSettled(promises);

		for (const res of result) {
			if (res.status === "rejected") {
				console.error("Error loding a store in default store manager : ", res.reason)
			}
		}
	}
}

export default new DefaultStoreManager();
