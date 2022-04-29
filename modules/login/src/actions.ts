import userDispatcher from "./dispatcher";
import { UserActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class ModuleActionCreator implements ActionCreator<UserActions> {
	constructor(protected dispatcher: Dispatcher<UserActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof UserActions>(action: K, data: UserActions[K]): void {
		switch (action) {
			case "login":
				this.login(data);
				break;
			default:
				break;
		}
	}

	public login(data: UserActions["login"]): void {
		this.dispatcher.dispatch({ type: "login", data });
	}
}

export default new ModuleActionCreator(userDispatcher);
