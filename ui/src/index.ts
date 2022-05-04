import { PrivateActionCreator } from "./actions";
import { App } from "./components/app";
import { AppDispatcher } from "./dispatcher";
import { FullAppActionsManager } from "./full-action-manager";
import { FullAppStoresManager } from "./full-store-manager";
import { PublicActionCreator } from "./public-actions";
import { PublicStoreManager } from "./public-store-manager";
import { PrivateStoreManager } from "./store-manager";

const fullStoresManager = new FullAppStoresManager();
const fullActionManager = new FullAppActionsManager();

const appDispatcher = new AppDispatcher();

const privateStoresManager = new PrivateStoreManager(fullActionManager, fullStoresManager, appDispatcher);
const publicStoresManager = new PublicStoreManager(privateStoresManager);

const privateActions = new PrivateActionCreator(appDispatcher);
const publicActions = new PublicActionCreator(appDispatcher);

fullStoresManager.set("app", publicStoresManager);
fullActionManager.set("app", publicActions);

await privateStoresManager.init();

const appComponent = new App(privateStoresManager, privateActions);

appComponent.update();

const app = document.getElementById("root");

if (!app) {
	throw "No app element";
}

app.appendChild(appComponent.get());
