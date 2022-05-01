import publicStoreManager from "./public-store-manager";

export class FullStoreManager {
	protected storeManagers: {[key: string]: any};

	constructor() {
		this.storeManagers = {
			app: publicStoreManager
		};
	}

	public set(name: string, storeManager: any): void {
		if (this.storeManagers[name]) {
			console.error(`There is already a storeManager defiend to this name "${name}"!`)
			return;
		}

		this.storeManagers[name] = storeManager;
	}

	public get(): { [key: string]: any } {
		return this.storeManagers;
	}
}

export default new FullStoreManager();
