import { ModulesStore } from "./stores/modules"
import {StoreManager} from "~/lib/interfaces/store-manager"

export class MainStoreManager implements StoreManager {
	public modules = new ModulesStore();
}

export const MainStoreManagerFactory = async (): Promise<MainStoreManager> => {
	const sm = new MainStoreManager();

	return sm
}
