import { StoreManager } from "~/lib/interfaces/store-manager";
import { ConfigStore } from "./stores/config";
import { ModulesStore } from "./stores/modules";

export interface PublicStores {
	config: ConfigStore;
	modules: ModulesStore;
}

export class PublicStoreManager implements StoreManager<PublicStores> {
	public readonly stores: PublicStores;

	constructor(privateStore: StoreManager<PublicStores>) {
		this.stores = {
			config: privateStore.stores.config,
			modules: privateStore.stores.modules,
		};
	}

	public async init(): Promise<void> {
		return;
	}
}
