import { StateFullComponent } from "~/lib/components/state-full-component";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { Reference } from "~/src/interfaces/reference";
import { References as ReferencesStyle, Reference as ReferenceStyle } from "./style.module.css";
import moduleStoreManager, { ModuleStoreManager } from "~src/modules-store-manager";

export class References extends StateFullComponent<ModuleStoreManager> {
	constructor() {
		super({
			element: document.createElement("div"),
			storeManager: moduleStoreManager,
			binds: ["references"]
		});

		this.element.className = ReferencesStyle;
	}

	public beforeUpdate(): void {
		this.children = [];
	}

	protected onUpdate(): void {
		for (const ref of this.stores.references.get()) {
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
