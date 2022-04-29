import appDispatcher from "./dispatcher";
import { AppActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class AppActionCreator implements ActionCreator<AppActions> {
	constructor(protected dispatcher: Dispatcher<AppActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof AppActions>(action: K, data: AppActions[K]): void {
		switch (action) {
			case "select_module":
				this.select_module(data as AppActions["select_module"]);
				break;
			default:
				break;
		}
	}

	public select_module(data: AppActions["select_module"]): void {
		this.dispatcher.dispatch("select_module", data);
	}
}

export default new AppActionCreator(appDispatcher);
