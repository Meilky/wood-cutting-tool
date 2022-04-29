import { App } from "./components/app";

const appComponent = new App();

appComponent.update();

export { PublicModuleActionCreator } from "./public-actions";
export { PublicModuleStoreManager } from "./public-store-manager";

export const component = appComponent;
