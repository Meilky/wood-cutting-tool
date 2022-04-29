import userDispatcher from "./dispatcher";
import { PublicModuleActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";
import userActionCreator from "./actions";

export class PublicModuleActionCreator implements ActionCreator<PublicModuleActions> {
	constructor(protected dispatcher: Dispatcher<PublicModuleActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof PublicModuleActions>(action: K, data: PublicModuleActions[K]): void {
		switch (action) {
			case "test":
				userActionCreator.call("test", data as PublicModuleActions["test"]);
				break;
			default:
				break;
		}
	}
}

export default new PublicModuleActionCreator(userDispatcher);
