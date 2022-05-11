import { StoreManager } from "~/lib/interfaces/store-manager";
import { PublicStores } from "~/lib/interfaces/modules/app/stores";

export class PublicStoresManager implements StoreManager<PublicStores> {
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
