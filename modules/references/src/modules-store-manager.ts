import { StoreManager } from "~/lib/interfaces/store-manager"
import { ReferencesStore } from "./stores/references";

export interface ModuleStores {
	references: ReferencesStore
}

export class ModuleStoreManager implements StoreManager<ModuleStores> {
	public readonly stores: ModuleStores;

	constructor() {
		this.stores = {
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
