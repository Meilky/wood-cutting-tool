import { StateLessComponent } from "../lib/components/state-less-component";
import { NavBar } from "./nav-bar/nav-bar";
import { TopBar } from "./top-bar/top-bar";
import { LoadedModule } from "./loaded-module/loaded-module";
import { App as AppStyle } from "./style.module.css"
import "../lib/stores/config"

export class App extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("div") });

		this.init();
	}

	public init(): void {
		this.element.className = AppStyle;

		this.children = [new TopBar(), new NavBar(), new LoadedModule()];

		this.appenChildren();
	}
}
