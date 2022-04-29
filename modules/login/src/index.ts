import { App } from "./components/app";

const appComponent = new App();

appComponent.update();

export { PublicActionCreator as ModuleActionCreator } from "./public-actions";
export { PublicStoreManager } from "./public-store-manager";

export const component = appComponent;
