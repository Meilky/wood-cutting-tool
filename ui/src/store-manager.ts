import { ModulesStore } from "./stores/modules"
import { StoreManager } from "~/lib/interfaces/store-manager"
import { ConfigStore } from "~/src/stores/config"
import { LoadedModuleStore } from "~/src/stores/loaded-module"

export class MainStoreManager implements StoreManager<{
	modules: ModulesStore,
	config: ConfigStore,
	loadedModule: LoadedModuleStore
}> {
	public readonly stores = {
		modules: new ModulesStore(),
		config: new ConfigStore(),
		loadedModule: new LoadedModuleStore()
	}

	public async init(): Promise<void> {
		const promises = []

		for (const store in this.stores) {
			promises.push(this.stores[store].init())
		}

		await Promise.allSettled(promises);
	}
}
