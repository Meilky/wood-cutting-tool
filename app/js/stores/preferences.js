import { Store } from "../lib/store.js"

class PreferencesStore extends Store {
	constructor() {
		super([])
	}

	init() {
		this.value = {
			unit: "in",
			diameter: 10
		};
	}
}

const st = new PreferencesStore();
st.init();

export default st;
