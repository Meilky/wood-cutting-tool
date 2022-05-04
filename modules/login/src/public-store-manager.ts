import { StoreManager } from "~/lib/interfaces/store-manager";
import { PublicStores } from "./interfaces/stores";

export class PublicStoreManager implements StoreManager<PublicStores> {
	public readonly stores: PublicStores;

	constructor(protected storeManager: StoreManager<PublicStores>) {
		this.stores = {
			user: this.storeManager.stores.user,
		};
	}

	public async init(): Promise<void> {
		return;
	}
}
