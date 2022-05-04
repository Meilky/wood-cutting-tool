import { FullManager } from "~/lib/interfaces/full-manager";

export class FullAppStoresManager implements FullManager<{ [key: string]: any }> {
	protected storeManagers: { [key: string]: any };

	constructor() {
		this.storeManagers = {};
	}

	public set<K extends keyof { [key: string]: any }>(name: K, storeManager: { [key: string]: any }[K]): void {
		if (this.storeManagers[name]) {
			console.error(`There is already a storeManager defiend to this name "${name}"!`);
			return;
		}

		this.storeManagers[name] = storeManager;
	}

	public get(): { [key: string]: any } {
		return this.storeManagers;
	}
}
