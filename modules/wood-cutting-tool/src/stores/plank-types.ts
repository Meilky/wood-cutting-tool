import { BaseStore } from "~/lib/stores/store";
import { PlankType } from "~/src/interfaces/plank-type";

export class PlankTypesStore extends BaseStore<PlankType[]> {
	constructor() {
		super([]);
	}

	public async init(): Promise<void> {
		const req = await fetch("/api/plank_types");
		const data = await req.json();

		this.value = data;
	}
}
