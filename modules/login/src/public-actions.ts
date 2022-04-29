import userDispatcher from "./dispatcher";
import { UserActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";
import userActionCreator from "./actions";

interface PublicActions extends UserActions {
	test: string
}

export class PublicActionCreator implements ActionCreator<PublicActions> {
	constructor(protected dispatcher: Dispatcher<UserActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof PublicActions>(action: K, data: PublicActions[K]): void {
		switch (action) {
			case "login":
				userActionCreator.call("login", data as PublicActions["login"]);
				break;
			default:
				break;
		}
	}
}

export default new PublicActionCreator(userDispatcher);
