import { App } from "./components/app";
import defaultStoreManager from "~/lib/default-store-manager"

await defaultStoreManager.init();

const app = document.getElementById("root");

if (!app) {
	throw "No app element";
}

const appComponent = new App();

appComponent.update()

app.appendChild(appComponent.get());
