import { StoreManager } from "~/lib/interfaces/store-manager";
import userStore, { UserStore } from "./store";

interface Stores {
	user: UserStore;
}

export class PublicStoreManager implements StoreManager<Stores> {
	public readonly stores: Stores;

	constructor() {
		this.stores = {
			user: userStore,
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
