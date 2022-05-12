import { PrivateActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PrivateActionCreator implements ActionCreator<PrivateActions> {
	public readonly actions: (keyof PrivateActions)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.call = this.call.bind(this);

		this.actions = ["login", "signup", "set_user", "get_user", "select_form"]
	}

	public call<K extends keyof PrivateActions>(action: K, data: PrivateActions[K]): void {
		this.dispatcher.dispatch(action, data);
	}
}
