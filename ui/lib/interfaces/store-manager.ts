import { Store } from "~/lib/stores/store.I";

export type StoreManager<T extends { [K: string]: Store<any> }> = {
	readonly stores: {
		[K in keyof T]: T[K]
	}

	init(): Promise<void>;
}
