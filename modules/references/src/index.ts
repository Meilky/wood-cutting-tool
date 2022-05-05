import { References } from "./components/references";
import modulesStoreManager from "./modules-store-manager";

export const init = async (): Promise<any> => {
	await modulesStoreManager.init()

	return {
		css: "/modules/references/index.css",
		component: new References()
	}
}
