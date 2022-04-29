import appActions from "./app-actions";
import appStores from "./app-stores";
import { App } from "./components/app";
import publicModuleActionCreator from "./public-actions";
import publicModuleStoreManager from "./public-store-manager";

const appComponent = new App();

appComponent.update();

export const moduleActionCreator = publicModuleActionCreator;
export const moduleStoreManager = publicModuleStoreManager;

export const appActionCreator = appActions;
export const appStoreManager = appStores;

export const component = appComponent;
