import { Component } from "../lib/component.js";
import { StateFullComponent } from "../lib/state-full-component.js";
import PlankTypesStore from "../stores/plank-types.js";

export class PlankTypes extends StateFullComponent {
	ctx;

	constructor() {
		super({ stores: { plankTypes: PlankTypesStore } });
	}

	start() {
		this.element = document.getElementById("plankTypes");
		this.update();
	}

	beforeUpdate() {
		this.children = [];
	}

	onUpdate() {
		for (const plank of this.stores.plankTypes.value) {
			const e = new Plank(plank);
			e.start();
			this.children.push(e);
		}
	}
}

class Plank extends Component {
	plank;

	constructor(plank) {
		super();
		this.plank = plank;
	}

	start() {
		this.element = document.createElement("li");
		this.element.className = "item";
		this.element.innerText = this.plank.name;
	}
}
