import { FullManager } from "~/lib/interfaces/full-manager";

export class FullActions implements FullManager<{ [key: string]: any }> {
	protected actionManager: { [key: string]: any };

	constructor() {
		this.actionManager = {};
	}

	public set<K extends keyof { [key: string]: any }>(name: K, actionManager: { [key: string]: any }[K]): void {
		if (this.actionManager[name]) {
			console.error(`There is already a storeManager defiend to this name "${name}"!`);
			return;
		}

		this.actionManager[name] = actionManager;
	}

	public get(): { [key: string]: any } {
		return this.actionManager;
	}
}
