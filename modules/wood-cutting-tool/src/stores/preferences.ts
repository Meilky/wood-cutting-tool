import { BaseStore } from "~/lib/stores/store";
import { Preference } from "~/src/interfaces/preference";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { ModuleActions } from "~/src/interfaces/actions"

export class PreferencesStore extends BaseStore<Preference> {
	constructor(protected dispatcher: Dispatcher<ModuleActions>) {
		super({
			unit: "in",
			diameter: 10,
		});

		dispatcher.bind("set_preferences", this.set)
	}

	public async init(): Promise<void> {
		return;
	}
}
