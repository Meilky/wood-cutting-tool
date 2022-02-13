import { Component } from "../lib/component.js";
import { StateFullComponent } from "../lib/state-full-component.js";
import ReferencesStore from "../stores/references.js";

export class References extends StateFullComponent {
	constructor() {
		super({ stores: { references: ReferencesStore } });
	}

	createElement() {
		this.element = document.getElementById("references");
	}

	beforeRender() {
		this.children = [];
	}

	onRender() {
		for (const ref of this.stores.references.value) {
			this.children.push(new Reference(ref));
		}
	}
}

class Reference extends Component {
	reference;
	constructor(reference) {
		super();
		this.reference = reference;
	}

	createElement() {
		this.element = document.createElement("div");
	}

	onRender() {
		this.element.innerHTML = `
		<a href="${this.reference.link}">${this.reference.name}</a>
		<p>${this.reference.description}</p>
		`;
	}
}
