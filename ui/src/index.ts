import { PrivateActionCreator } from "./actions";
import { App } from "./components/app";
import { AppDispatcher } from "./dispatcher";
import { FullActionManager } from "./full-action-manager";
import { FullStoresManager } from "./full-store-manager";
import { PublicActionCreator } from "./public-actions";
import { PublicStoreManager } from "./public-store-manager";
import { PrivateStoreManager } from "./store-manager";

const fullStoresManager = new FullStoresManager();
const fullActionManager = new FullActionManager();

const appDispatcher = new AppDispatcher()

const privateStoresManager = new PrivateStoreManager(fullActionManager, fullStoresManager, appDispatcher);
const publicStoresManager = new PublicStoreManager(privateStoresManager);

const privateActions = new PrivateActionCreator(appDispatcher);
const publicActions = new PublicActionCreator(appDispatcher);

fullStoresManager.set("app", publicStoresManager)
fullActionManager.set("app", publicActions)

await privateStoresManager.init()

const appComponent = new App(privateStoresManager, privateActions);

appComponent.update();

const app = document.getElementById("root");

if (!app) {
	throw "No app element";
}

app.appendChild(appComponent.get());
