import { StoreManager } from "~/lib/interfaces/store-manager";
import moduleStoreManager from "./store-manager";
import { UserStore } from "./stores/user-store";

interface PublicModuleStores {
	user: UserStore;
}

export class PublicModuleStoreManager implements StoreManager<PublicModuleStores> {
	public readonly stores: PublicModuleStores;

	constructor() {
		this.stores = {
			user: moduleStoreManager.stores.user,
		};
	}

	public async init(): Promise<void> {
		return moduleStoreManager.init();
	}
}

export default new PublicModuleStoreManager();
