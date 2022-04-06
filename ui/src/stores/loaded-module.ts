import { BaseStore } from "~/lib/stores/store";

class LoadedModuleStore extends BaseStore<number> {
	constructor() {
		super(-1);
	}

	public init(): void {
		return;
	}
}

export default new LoadedModuleStore();
