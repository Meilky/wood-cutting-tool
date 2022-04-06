import { App } from "./components/app";

const app = document.getElementById("root");

if (!app) {
	throw "No app element";
}

const appComponent = new App();

app.appendChild(appComponent.get());
