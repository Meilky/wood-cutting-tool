import { StateFullComponent } from "../lib/state-full-component.js";
import PreferencesStore from "../stores/preferences.js";

export class Preferences extends StateFullComponent {
	constructor() {
		super({ stores: { preferences: PreferencesStore } });
		this.createElement = this.start.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	start() {
		this.element = document.getElementById("preferences");
		this.element.addEventListener("submit", this.onSubmit);
	}

	onSubmit(e) {
		e.preventDefault();

		const form = new FormData(e.target);
		const newData = {
			unit: form.get("unit"),
			diameter: Number(form.get("diameter")),
		};

		this.stores.preferences.value = newData;
	}
}
