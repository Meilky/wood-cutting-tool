import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { AppActions } from "./interfaces/actions";

export class AppDispatcher implements Dispatcher<AppActions> {
	protected actions: { [K in keyof AppActions]: (value: AppActions[K]) => void };

	constructor() {
		this.actions = { test: this.naCallback, refresh_modules: this.naCallback };

		this.bind = this.bind.bind(this);
		this.dispatch = this.dispatch.bind(this);
	}

	protected naCallback(_: any): void {
		return;
	}

	public bind(actions: {
		[K in keyof AppActions]: (value: AppActions[K]) => void;
	}): void {
		this.actions = { ...this.actions, ...actions };
	}

	public dispatch<K extends keyof AppActions>(action: { type: K; data: AppActions[K] }): void {
		if (this.actions[action.type]) {
			this.actions[action.type](action.data);
		}
	}
}

export default new AppDispatcher();
