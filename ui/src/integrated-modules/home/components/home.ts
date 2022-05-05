import { StateLessComponent } from "~/lib/components/state-less-component";

export class Home extends StateLessComponent {
	constructor() {
		super({
			element: document.createElement("div"),
		});

		this.element.innerText =
			"This is the home module, go in the login module, it should have a button that will use one of the app actions. The action will reselect the home page, so you will see this message once again.";
	}
}
