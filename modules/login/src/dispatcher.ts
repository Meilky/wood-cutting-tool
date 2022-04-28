import { Dispatcher } from "./interfaces/dispatcher";
import { UserActions } from "./interfaces/actions";

export class UserDispatcher implements Dispatcher<UserActions> {
	protected actions: { [K in keyof UserActions]: (value: UserActions[K]) => void };

	constructor() {
		this.actions = { login: this.naCallback };
	}

	protected naCallback(_: any): void {
		return;
	}

	public bind(actions: {
		[K in keyof UserActions]: (value: UserActions[K]) => void;
	}): void {
		this.actions = { ...this.actions, ...actions };
	}

	public dispatch<K extends keyof UserActions>(action: { type: K; data: UserActions[K] }): void {
		if (this.actions[action.type]) {
			this.actions[action.type](action.data);
		}
	}
}

export default new UserDispatcher();
