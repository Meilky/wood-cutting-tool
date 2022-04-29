import { StoreManager } from "~/lib/interfaces/store-manager";
import moduleStoreManager from "./store-manager";
import { UserStore } from "./stores/user-store";

interface PublicStores {
	user: UserStore;
}

export class PublicStoreManager implements StoreManager<PublicStores> {
	public readonly stores: PublicStores;

	constructor() {
		this.stores = {
			user: moduleStoreManager.stores.user,
		};
	}

	public async init(): Promise<void> {
		return moduleStoreManager.init()
	}
}
