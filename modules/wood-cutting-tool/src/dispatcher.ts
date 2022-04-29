import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { ModuleActions } from "./interfaces/actions";

export class ModuleDispatcher implements Dispatcher<ModuleActions> {
	protected actions: { [K in keyof ModuleActions]: (value: ModuleActions[K]) => void };

	constructor() {
		this.actions = { set_preferences: this.naCallback };

		this.bind = this.bind.bind(this);
		this.dispatch = this.dispatch.bind(this);
	}

	protected naCallback(): void {
		console.error("No store for this action")
	}

	public bind<K extends keyof ModuleActions>(action: K, callback: (value: ModuleActions[K]) => void): void {
		if (this.actions[action]) {
			this.actions[action] = callback;
		}
	}

	public dispatch<K extends keyof ModuleActions>(action: K, data: ModuleActions[K]): void {
		if (this.actions[action]) {
			this.actions[action](data);
		}
	}
}

export default new ModuleDispatcher();
