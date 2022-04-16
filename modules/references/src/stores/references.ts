import { BaseStore } from "~/lib/stores/store";
import { Reference } from "~/src/interfaces/reference";

class ReferencesStore extends BaseStore<Reference[]> {
	constructor() {
		super([
			{
				id: -1,
				name: "No references found",
				description: "There is no references found.",
				link: "",
			},
		]);

		this.init()
	}

	async init(): Promise<void> {
		const req = await fetch("/api/v1/references");
		const data = await req.json();

		this.value = data;
	}
}

const st = new ReferencesStore();

export default st;
