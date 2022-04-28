import { StateLessComponent } from "~lib/components/state-less-component";
import userHandler from "~src/actions";

export class App extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("button") });

		this.element.onclick = this.onClick;
		this.onClick = this.onClick.bind(this);
		this.element.innerText = "Click me";
	}

	protected onClick(): void {
		userHandler.login({
			email: "bigbrain",
			token: "jflakjdfl",
			username: "alskjdflas",
		});
	}
}
