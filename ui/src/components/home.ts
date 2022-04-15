import { StateLessComponent } from "~/lib/components/state-less-component";

export class Home extends StateLessComponent {
	constructor() {
		super({
			element: document.createElement("div"),
		});

		this.init();
	}

	public init(): void {
		this.element.innerText = "Home page";
	}
}