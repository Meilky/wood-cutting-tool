import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { PrivateActions } from "./interfaces/actions";

export class ModuleDispatcher implements Dispatcher<PrivateActions> {
	protected actions: { [K in keyof PrivateActions]: (value: PrivateActions[K]) => void };

	constructor() {
		this.actions = { login: this.naCallback, signup: this.naCallback, select_form: this.naCallback, get_user: this.naCallback, set_user: this.naCallback };

		this.bind = this.bind.bind(this);
		this.dispatch = this.dispatch.bind(this);
	}

	protected naCallback(_: any): void {
		return;
	}

	public bind<K extends keyof PrivateActions>(action: K, callback: (value: PrivateActions[K]) => void): void {
		this.actions[action] = callback as any;
	}

	public dispatch<K extends keyof PrivateActions>(action: K, data: PrivateActions[K]): void {
		if (this.actions[action]) {
			this.actions[action](data);
		}
	}
}
