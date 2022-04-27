import { References } from "./components/references";
import modulesStoreManager from "./modules-store-manager";

await modulesStoreManager.init()

export const css = "/modules/references/index.css"
export const component = new References();
