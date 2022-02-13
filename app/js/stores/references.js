import { Store } from "../lib/store.js"

class ReferencesStore extends Store {
	constructor() {
		super([])
	}

	async init() {
		const req = await fetch("/api/references.php");
		const data = await req.json();
		
		this.value = data;
	}
}

const st = new ReferencesStore();
st.init();

export default st;
