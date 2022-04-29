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
			case "set_preferences":
				this.set_preferences(data as ModuleActions["set_preferences"]);
				break;
			default:
				break;
		}
	}

	public set_preferences(data: ModuleActions["set_preferences"]): void {
		this.dispatcher.dispatch("set_preferences", data);
	}
}

export default new ModuleActionCreator(userDispatcher);
