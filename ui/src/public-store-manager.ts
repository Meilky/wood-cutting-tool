import { StoreManager } from "~/lib/interfaces/store-manager";
import { ConfigStore } from "./stores/config";

export interface PublicStores {
	config: ConfigStore;
}

export class PublicStoreManager implements StoreManager<PublicStores> {
	public readonly stores: PublicStores;

	constructor(protected privateStore: StoreManager<PublicStores>) {
		this.stores = {
			config: this.privateStore.stores.config,
		};
	}

	public async init(): Promise<void> {
		return;
	}
}
