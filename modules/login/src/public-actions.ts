import { PublicActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PublicActionCreator implements ActionCreator<PublicActions> {
	constructor(protected actions: ActionCreator<PublicActions>, protected dispatcher: Dispatcher<PublicActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof PublicActions>(action: K, data: PublicActions[K]): void {
		switch (action) {
			case "test":
				this.actions.call("test", data);
				break;
			default:
				break;
		}
	}
}
