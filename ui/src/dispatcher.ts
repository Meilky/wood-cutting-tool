import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { AppActions } from "./interfaces/actions";

export class AppDispatcher implements Dispatcher<AppActions> {
	protected actions: { [K in keyof AppActions]: (value: AppActions[K]) => void };

	constructor() {
		this.actions = { select_module: this.naCallback };

		this.bind = this.bind.bind(this);
		this.dispatch = this.dispatch.bind(this);
	}

	protected naCallback(_: any): void {
		return;
	}

	public bind<K extends keyof AppActions>(action: K, callback: (value: AppActions[K]) => void): void {
		if (this.actions[action]) {
			this.actions[action] = callback as any;
		}
	}

	public dispatch<K extends keyof AppActions>(action: K, data: AppActions[K]): void {
		if (this.actions[action]) {
			this.actions[action](data);
		}
	}
}

export default new AppDispatcher();
