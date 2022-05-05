import { PublicActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PublicActionsCreator implements ActionCreator<PublicActions> {
	constructor(protected dispatcher: Dispatcher<PublicActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof PublicActions>(action: K, data: PublicActions[K]): void {
		switch (action) {
			case "select_module":
				this.dispatcher.dispatch("select_module", data);
				break;
			default:
				break;
		}
	}
}
