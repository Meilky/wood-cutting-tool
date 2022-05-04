import { StateLessComponent } from "~/lib/components/state-less-component";
import { NavBar } from "./nav-bar/nav-bar";
import { TopBar } from "./top-bar/top-bar";
import { LoadedModule } from "./loaded-module/loaded-module";
import { App as AppStyle } from "./style.module.css";
import { StoreManager } from "~lib/interfaces/store-manager";
import { PrivateStores } from "~src/store-manager";
import { PrivateActions } from "~src/interfaces/actions";
import { ActionCreator } from "~lib/interfaces/action-creator";

export class App extends StateLessComponent {
	constructor(privateStoresManager: StoreManager<PrivateStores>, privateActions: ActionCreator<PrivateActions>) {
		super({ element: document.createElement("div") });

		this.element.className = AppStyle;

		this.children = [
			new TopBar(privateStoresManager),
			new NavBar(privateStoresManager, privateActions),
			new LoadedModule(privateStoresManager),
		];
	}
}
