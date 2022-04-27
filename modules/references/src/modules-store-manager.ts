import { StoreManager } from "~/lib/interfaces/store-manager"
import { DefaultStoreManager } from "~/lib/default-store-manager";
import { ReferencesStore } from "./stores/references";
import { ModulesStore } from "~lib/stores/modules";
import { ConfigStore } from "~lib/stores/config";
import { LoadedModuleStore } from "~lib/stores/loaded-module";

export interface ModuleStores extends DefaultStoreManager {
	references: ReferencesStore
}

export class ModuleStoreManager implements StoreManager<ModuleStores> {
	public readonly stores: ModuleStores;

	constructor() {
		this.stores = {
			modules: new ModulesStore(),
			config: new ConfigStore(),
			loadedModule: new LoadedModuleStore(),
			references: new ReferencesStore()
		}
	}

	public async init(): Promise<void> {
		const promises = []

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof ModuleStores].init())
		}

		await Promise.allSettled(promises);
	}
}

export default new ModuleStoreManager();
