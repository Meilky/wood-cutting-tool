import { BaseStore } from "~/lib/stores/store";
import { Preference } from "~/src/interfaces/preference";

class PreferencesStore extends BaseStore<Preference> {
	constructor() {
		super({
			unit: "in",
			diameter: 10,
		});
	}

	public async init(): Promise<void> {
		return;
	}
}

const store = new PreferencesStore();

export default store;
