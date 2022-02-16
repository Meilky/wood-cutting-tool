import { Component } from "../lib/component.js";
import { StateFullComponent } from "../lib/state-full-component.js";
import ReferencesStore from "../stores/references.js";

export class References extends StateFullComponent {
	constructor() {
		super({ stores: { references: ReferencesStore } });
	}

	start() {
		this.element = document.getElementById("content");
	}

	beforeUpdate() {
		this.children = [];
	}

	onUpdate() {
		for (const ref of this.stores.references.value) {
			const e = new Reference(ref);
			e.start();
			this.children.push(e);
		}
	}
}

class Reference extends Component {
	reference;

	constructor(reference) {
		super();
		this.reference = reference;
	}

	start() {
		this.element = document.createElement("div");
		this.element.className = "container";
		this.element.innerHTML = `
		<a href="${this.reference.link}" class="name link">${this.reference.name}</a>
		<p class="container-data">${this.reference.description}</p>
		`;
	}
}
