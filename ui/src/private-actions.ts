import { PrivateActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PrivateActionsCreator implements ActionCreator<PrivateActions> {
	public readonly actions: (keyof PrivateActions)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.call = this.call.bind(this);

		this.actions = ["select_module"];
	}

	public call<K extends keyof PrivateActions>(action: K, data: PrivateActions[K]): void {
		switch (action) {
			case "select_module":
				this.select_module(data as PrivateActions["select_module"]);
				break;
			default:
				break;
		}
	}

	public select_module(data: PrivateActions["select_module"]): void {
		this.dispatcher.dispatch("select_module", data);
	}
}
