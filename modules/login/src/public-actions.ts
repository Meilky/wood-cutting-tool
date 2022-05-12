import { PublicActions } from "./interfaces/actions";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ActionCreator } from "~/lib/interfaces/action-creator";

export class PublicActionCreator implements ActionCreator<PublicActions> {
	public readonly actions: (keyof PublicActions)[];

	constructor(protected privateActions: ActionCreator<PublicActions>, protected dispatcher: Dispatcher<PublicActions>) {
		this.call = this.call.bind(this);
		this.actions = []
	}

	public call<K extends keyof PublicActions>(action: K, data: PublicActions[K]): void {
		switch (action) {
			default:
				break;
		}
	}
}
