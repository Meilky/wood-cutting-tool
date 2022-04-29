import userDispatcher from "./dispatcher";
import { ModuleActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class ModuleActionCreator implements ActionCreator<ModuleActions> {
	constructor(protected dispatcher: Dispatcher<ModuleActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof ModuleActions>(action: K, data: ModuleActions[K]): void {
		switch (action) {
			case "login":
				this.login(data as ModuleActions["login"]);
				break;
			default:
				break;
		}
	}

	public login(data: ModuleActions["login"]): void {
		this.dispatcher.dispatch({ type: "login", data });
	}
}

export default new ModuleActionCreator(userDispatcher);
