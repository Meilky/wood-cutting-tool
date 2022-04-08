import { StateFullComponent } from "~/lib/components/state-full-component";
import { StateLessComponent } from "~/lib/components/state-less-component";
import PlankTypesStore from "~/src/stores/plank-types";
import { PlankType } from "~/src/interfaces/plank-type";

export class PlankTypes extends StateFullComponent<{ plankTypes: typeof PlankTypesStore }> {
	constructor() {
		super({
			element: document.createElement("ul"),
			stores: { plankTypes: PlankTypesStore }
		});
	}

	public init(): void {
		this.update()
	}

	public beforeUpdate(): void {
		this.children = [];
	}

	public onUpdate(): void {
		for (const plank of this.stores.plankTypes.value) {
			const e = new Plank(plank);
			this.children.push(e);
		}
	}
}

class Plank extends StateLessComponent {
	constructor(protected plank: PlankType) {
		super({
			element: document.createElement("li")
		});
	}

	public init(): void {
		this.element.innerText = this.plank.name;
	}
}
