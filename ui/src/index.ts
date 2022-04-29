import { App } from "./components/app";
import appStoreManager from "./store-manager";

await appStoreManager.init();

const app = document.getElementById("root");

if (!app) {
	throw "No app element";
}

const appComponent = new App();

appComponent.update();

app.appendChild(appComponent.get());
