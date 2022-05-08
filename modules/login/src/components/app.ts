import { StateLessComponent } from "~lib/components/state-less-component";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { PrivateActions } from "~src/interfaces/actions";
import { StoreManager } from "~lib/interfaces/store-manager";
import { Form as FormStyle, Input as InputStyle, Submit as SubmitStyle, Title as TitleStyle, Label as LabelStyle } from "./app.module.css"
import { StateFullComponent } from "~lib/components/state-full-component";
import { PrivateStores } from "~src/interfaces/stores";
import { Forms } from "~src/interfaces/forms";
import { Component } from "~/lib/components/component.I"

export class App extends StateFullComponent<StoreManager<PrivateStores>> {
	protected namedChildren: { login: Component[], signup: Component[] }

	constructor(
		protected actions: ActionCreator<PrivateActions>,
		storeManager: StoreManager<PrivateStores>
	) {
		super({ element: document.createElement("div"), storeManager, binds: ["loadedForm"] });

		const tabs = new Tabs(actions);
		this.namedChildren = {
			login: [tabs, new LoginForm(actions)],
			signup: [tabs, new SignupForm(actions)]
		}
	}

	protected onUpdate(): void {
		switch (this.stores.loadedForm.get()) {
			case Forms.LOGIN:
				this.children = this.namedChildren.login
				break;
			case Forms.SIGNUP:
				this.children = this.namedChildren.signup
				break;
			default:
				break;
		}
	}
}

class Tabs extends StateLessComponent {
	constructor(
		protected actions: ActionCreator<PrivateActions>,
	) {
		super({ element: document.createElement("div") });

		this.onClickLogin = this.onClickLogin.bind(this);
		this.onClickSignup = this.onClickSignup.bind(this);

		this.children = [
			new Button({ inner: "Login", onClick: this.onClickLogin }),
			new Button({ inner: "Signup", onClick: this.onClickSignup }),
		];
	}

	protected onClickLogin(): void {
		this.actions.call("select_form", Forms.LOGIN)
	}

	protected onClickSignup(): void {
		this.actions.call("select_form", Forms.SIGNUP)
	}
}

class LoginForm extends StateLessComponent {
	constructor(
		protected actions: ActionCreator<PrivateActions>,
	) {
		super({ element: document.createElement("form") });

		this.element.className = FormStyle;

		this.children = [
			new Label({ inner: "Username or Email:", for: "usernameOrEmail", className: LabelStyle }),
			new Input({ name: "usernameOrEmail", type: "text", className: InputStyle }),
			new Label({ inner: "Password:", for: "password", className: LabelStyle }),
			new Input({ name: "password", type: "password", className: InputStyle }),
			new Button({ inner: "Submit", type: "submit", className: SubmitStyle }),
		];

		this.onSubmit = this.onSubmit.bind(this);

		this.element.onsubmit = this.onSubmit;
	}

	protected onSubmit(e: SubmitEvent): void {
		e.preventDefault();

		const rawData = new FormData(e.target as HTMLFormElement);

		const loginData: any = {}

		for (const [key, value] of rawData) {
			loginData[key] = value
		}

		this.actions.call("login", loginData)
	}
}

class SignupForm extends StateLessComponent {
	constructor(
		protected actions: ActionCreator<PrivateActions>,
	) {
		super({ element: document.createElement("form") });

		this.element.className = FormStyle;

		this.children = [
			new Title({ inner: "Signup", className: TitleStyle }),
			new Label({ inner: "Username:", for: "username", className: LabelStyle }),
			new Input({ name: "username", type: "text", className: InputStyle }),
			new Label({ inner: "Email:", for: "email", className: LabelStyle }),
			new Input({ name: "email", type: "email", className: InputStyle }),
			new Label({ inner: "Password:", for: "password", className: LabelStyle }),
			new Input({ name: "password", type: "password", className: InputStyle }),
			new Button({ inner: "Submit", type: "submit", className: SubmitStyle }),
		];

		this.onSubmit = this.onSubmit.bind(this);

		this.element.onsubmit = this.onSubmit;
	}

	protected onSubmit(e: SubmitEvent): void {
		e.preventDefault();

		const rawData = new FormData(e.target as HTMLFormElement);

		const signupData: any = {}

		for (const [key, value] of rawData) {
			signupData[key] = value
		}

		this.actions.call("signup", signupData)
	}
}

interface TitleProps {
	inner: string;
	className?: string;
}

class Title extends StateLessComponent {
	constructor(props: TitleProps) {
		super({ element: document.createElement("h1") });

		this.element.innerText = props.inner;

		if (props.className) this.element.className = props.className;
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
	className?: string;
	onClick?: (e: Event) => void;
}

class Button extends StateLessComponent {
	constructor(props: ButtonProps) {
		super({ element: document.createElement("button") });

		this.element.innerText = props.inner;

		if (props.type) this.element.setAttribute("type", props.type);
		if (props.className) this.element.className = props.className;
		if (props.onClick) this.element.onclick = props.onClick
	}
}
