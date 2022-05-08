import { StoreManager } from "~/lib/interfaces/store-manager";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "./interfaces/actions";
import { PrivateStores } from "./interfaces/stores";
import { LoadedFormStore } from "./stores/loaded-form";
import { UserStore } from "./stores/user-store";

export class PrivateStoreManager implements StoreManager<PrivateStores> {
	public readonly stores: PrivateStores;

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.stores = {
			user: new UserStore(dispatcher),
			loadedForm: new LoadedFormStore(dispatcher)
		};
	}

	public async init(): Promise<void> {
		const promises = [];

		for (const store in this.stores) {
			promises.push(this.stores[store as keyof PrivateStores].init());
		}

		const result = await Promise.allSettled(promises);

		for (const res of result) {
			if (res.status === "rejected") {
				console.error("Error loding a store in main login store manager: ", res.reason);
			}
		}
	}
}
