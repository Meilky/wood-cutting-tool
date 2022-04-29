import publicStoreManager,{ PublicStoreManager } from "./public-store-manager";

export class FullStoreManager {
	public readonly actions: {
		app: PublicStoreManager
	};

	constructor() {
		this.actions = {
			app: publicStoreManager
		};
	}
}

export default new FullStoreManager();
