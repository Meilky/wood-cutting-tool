import { StoreManager } from "~/lib/interfaces/store-manager";
import moduleDispatcher from "./dispatcher";
import { PlankTypesStore } from "./stores/plank-types";
import { PreferencesStore } from "./stores/preferences";

interface ModuleStores {
	plankTypes: PlankTypesStore;
	preferences: PreferencesStore;
}

export class ModuleStoreManager implements StoreManager<ModuleStores> {
	public readonly stores: ModuleStores;

	constructor() {
		this.stores = {
			plankTypes: new PlankTypesStore(),
			preferences: new PreferencesStore(moduleDispatcher)
		};
	}

	public async init(): Promise<void> {
		const promises = [];

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof ModuleStores].init());
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
