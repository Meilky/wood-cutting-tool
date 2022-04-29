import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ModuleActions } from "./interfaces/actions";

export class ModuleDispatcher implements Dispatcher<ModuleActions> {
	protected actions: { [K in keyof ModuleActions]: (value: ModuleActions[K]) => void };

	constructor() {
		this.actions = { login: this.naCallback, test: this.naCallback };

		this.bind = this.bind.bind(this);
		this.dispatch = this.dispatch.bind(this);
	}

	protected naCallback(_: any): void {
		return;
	}

	public bind<K extends keyof ModuleActions>(action: K, callback: (value: ModuleActions[K]) => void): void {
		if (this.actions[action]) {
			this.actions[action] = callback as any;
		}
	}

	public dispatch<K extends keyof ModuleActions>(action: { type: K; data: ModuleActions[K] }): void {
		if (this.actions[action.type]) {
			this.actions[action.type](action.data);
		}
	}
}

export default new ModuleDispatcher();
