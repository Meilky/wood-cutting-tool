import { PrivateActionsCreator } from "./private-actions";
import { PrivateStoresManager } from "./private-stores";
import { App } from "./components/app";
import { AppDispatcher } from "./dispatcher";
import { FullActions } from "./full-actions";
import { FullStores } from "./full-stores";
import { PublicActionsCreator } from "./public-actions";
import { PublicStoresManager } from "./public-stores";

const fullStores = new FullStores();
const fullActions = new FullActions();

const appDispatcher = new AppDispatcher();

const privateStores = new PrivateStoresManager(fullActions, fullStores, appDispatcher);
const publicStores = new PublicStoresManager(privateStores);

const privateActions = new PrivateActionsCreator(appDispatcher);
const publicActions = new PublicActionsCreator(appDispatcher);

fullStores.set("app", publicStores);
fullActions.set("app", publicActions);

privateStores.init();

const appComponent = new App(privateStores, privateActions);

appComponent.update();

const app = document.getElementById("root");

if (!app) {
	throw "No app element";
}

app.appendChild(appComponent.get());
