import { PrivateActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PrivateActionCreator implements ActionCreator<PrivateActions> {
	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof PrivateActions>(action: K, data: PrivateActions[K]): void {
		switch (action) {
			case "login":
				this.login(data as PrivateActions["login"]);
				break;
			default:
				break;
		}
	}

	public login(data: PrivateActions["login"]): void {
		this.dispatcher.dispatch("login", data);
	}
}
