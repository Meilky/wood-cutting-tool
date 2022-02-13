import { Component } from "../lib/component.js";
import { StateFullComponent } from "../lib/state-full-component.js";
import PlankTypesStore from "../stores/plank-types.js";

export class PlankTypes extends StateFullComponent {
	ctx;
	constructor() {
		super({ stores: { plankTypes: PlankTypesStore } });
	}

	createElement() {
		this.element = document.getElementById("plankTypes");
	}

	beforeRender() {
		this.children = [];
	}

	onRender() {
		for (const plank of this.stores.plankTypes.value) {
			this.children.push(new Plank(plank));
		}
	}
}

class Plank extends Component {
	plank;
	constructor(plank) {
		super();
		this.plank = plank;
	}

	createElement() {
		this.element = document.createElement("li");
	}

	onRender() {
		this.element.innerText = this.plank.name;
	}
}
