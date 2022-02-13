import { Store } from "../lib/store.js"

class PlantTypesStore extends Store {
	constructor() {
		super([])
	}

	async init() {
		const req = await fetch("/api/plankTypes.php");
		const data = await req.json();
		
		this.value = data;
	}
}

const st = new PlantTypesStore();
st.init();

export default st;
