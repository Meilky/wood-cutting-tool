import { StoreManager } from "~/lib/interfaces/store-manager";
import appStoreManager from "./store-manager";
import { ConfigStore } from "./stores/config";

interface PublicStores {
	config: ConfigStore;
}

export class PublicStoreManager implements StoreManager<PublicStores> {
	public readonly stores: PublicStores;

	constructor() {
		this.stores = {
			config: appStoreManager.stores.user,
		};
	}

	public async init(): Promise<void> {
		return appStoreManager.init();
	}
}
