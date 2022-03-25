import { StateLessComponent } from "../lib/components/state-less-component";
import { NavBar } from "./nav-bar/nav-bar";
import { TopBar } from "./top-bar/top-bar";
import { App as AppStyle } from "./style.module.css"
import "../lib/stores/config"

export class App extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("div") });

		this.element.className = AppStyle;

		this.init();
	}

	public init(): void {
		this.children = [new TopBar(), new NavBar()];

		this.appenChildren();
	}
}
