import { BaseStore } from "~/lib/stores/store";
import { Preference } from "~/src/interfaces/preference";

class PreferencesStore extends BaseStore<Preference> {
	constructor() {
		super({
			unit: "in",
			diameter: 10,
		});
	}

	public init(): void {
		return;
	}
}

const store = new PreferencesStore();
store.init();

export default store;
