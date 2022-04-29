import appDispatcher from "./dispatcher";
import { PublicAppActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PublicActionCreator implements ActionCreator<PublicAppActions> {
	constructor(protected dispatcher: Dispatcher<PublicAppActions>) {
		this.call = this.call.bind(this);
	}

	public call<K extends keyof PublicAppActions>(action: K, data: PublicAppActions[K]): void {
		switch (action) {
			case "test":
				this.dispatcher.dispatch({ type: "test", data })
				break;
			default:
				break;
		}
	}
}

export default new PublicActionCreator(appDispatcher);
