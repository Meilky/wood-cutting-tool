import { App } from "./components/App";

const app = document.getElementById("App");

if (!app) {
	throw "No app element";
}

const appComponent = new App();

app.appendChild(appComponent.get());
