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
			case "test":
				this.test(data as AppActions["test"]);
				break;
			case "refresh_modules":
				this.refresh_module(data as AppActions["refresh_modules"]);
				break;
			default:
				break;
		}
	}

	public test(data: AppActions["test"]): void {
		this.dispatcher.dispatch({ type: "test", data });
	}

	public refresh_module(data: AppActions["refresh_modules"]): void {
		this.dispatcher.dispatch({ type: "refresh_modules", data });
	}
}

export default new AppActionCreator(appDispatcher);
