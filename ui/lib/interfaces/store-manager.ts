import { Store } from "~/lib/stores/store.I";

export type StoreManager = {
	[K:string]: Store<any>
}
