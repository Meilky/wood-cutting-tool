import { BaseStore } from "~/lib/stores/store";
import { PlankType } from "~/src/interfaces/plank-type";

class PlantTypesStore extends BaseStore<PlankType[]> {
	constructor() {
		super([]);
		this.init()
	}

	public async init(): Promise<void> {
		const req = await fetch("/api/plank_types");
		const data = await req.json();

		this.value = data;
	}
}

const store = new PlantTypesStore();

export default store;
