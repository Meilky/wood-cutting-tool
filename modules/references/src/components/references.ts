import { StateFullComponent } from "~/lib/components/state-full-component";
import { StateLessComponent } from "~/lib/components/state-less-component";
import ReferencesStore from "~/src/stores/references";
import { Reference } from "~/src/interfaces/reference";
import { References as ReferencesStyle, Reference as ReferenceStyle } from "./style.module.css";

export class References extends StateFullComponent<{ references: typeof ReferencesStore }> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: { references: { store: ReferencesStore, bind: true } },
		});

		this.element.className = ReferencesStyle;
	}

	public beforeUpdate(): void {
		this.children = [];
	}

	protected onUpdate(): void {
		for (const ref of this.stores.references.value) {
			const e = new ReferenceComponent(ref);
			this.children.push(e);
		}
	}
}

class ReferenceComponent extends StateLessComponent {
	constructor(protected reference: Reference) {
		super({
			element: document.createElement("div"),
		});

		this.element.className = ReferenceStyle;

		this.element.innerHTML = `
		<a href="${this.reference.link}">${this.reference.name}</a>
		<p >${this.reference.description}</p>
		`;
	}
}
