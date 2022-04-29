import { StoreManager } from "~/lib/interfaces/store-manager";
import { ConfigStore } from "./stores/config";
import { ModulesStore } from "./stores/modules";

interface Stores {
	config: ConfigStore;
	modules: ModulesStore;
}

export class ModuleStoreManager implements StoreManager<Stores> {
	public readonly stores: Stores;

	constructor() {
		this.stores = {
			config: new ConfigStore(),
			modules: new ModulesStore(),
		};
	}

	public async init(): Promise<void> {
		const promises = [];

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof Stores].init());
		}

		const result = await Promise.allSettled(promises);

		for (const res of result) {
			if (res.status === "rejected") {
				console.error("Error loding a store in main login store manager: ", res.reason);
			}
		}
	}
}

export default new ModuleStoreManager();
