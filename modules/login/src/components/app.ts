import { StateLessComponent } from "~lib/components/state-less-component";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { PrivateActions } from "~src/interfaces/actions";
import { FullManager } from "~/lib/interfaces/full-manager";
import { StoreManager } from "~lib/interfaces/store-manager";

interface FullStores {
	app: StoreManager<any>;
}

interface FullActions {
	app: ActionCreator<any>;
}

export class App extends StateLessComponent {
	constructor(
		protected actions: ActionCreator<PrivateActions>,
		protected fullActions: FullManager<FullActions>,
		protected fullStores: FullManager<FullStores>
	) {
		super({ element: document.createElement("form") });

		this.children = [
			new Label({ inner: "Username:", for: "username" }),
			new Input({ name: "username", type: "text" }),
			new BR(),
			new Label({ inner: "Password:", for: "password" }),
			new Input({ name: "password", type: "password" }),
			new BR(),
			new Button({ inner: "Submit", type: "submit" }),
		];

		this.onSubmit = this.onSubmit.bind(this);

		this.element.onsubmit = this.onSubmit;
	}

	protected onSubmit(): void {
		this.fullActions.get().app.call("select_module", this.fullStores.get().app.stores.modules.get()[0]);
	}
}

interface LabelProps {
	inner: string;
	for?: string;
	className?: string;
}

class Label extends StateLessComponent {
	constructor(props: LabelProps) {
		super({ element: document.createElement("label") });

		this.element.innerText = props.inner;

		if (props.for) this.element.setAttribute("for", props.for);
		if (props.className) this.element.className = props.className;
	}
}

interface InputProps {
	name: string;
	className?: string;
	type?: string;
}

class Input extends StateLessComponent {
	constructor(props: InputProps) {
		super({ element: document.createElement("input") });

		this.element.setAttribute("name", props.name);
		if (props.type) this.element.setAttribute("type", props.type);
		if (props.className) this.element.className = props.className;
	}
}

interface ButtonProps {
	inner: string;
	type?: string;
}

class Button extends StateLessComponent {
	constructor(props: ButtonProps) {
		super({ element: document.createElement("button") });

		this.element.innerText = props.inner;
		if (props.type) this.element.setAttribute("type", props.type);
	}
}

class BR extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("br") });
	}
}
