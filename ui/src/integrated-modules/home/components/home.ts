import { StateLessComponent } from "~/lib/components/state-less-component";
import { FullManager } from "~lib/interfaces/full-manager";

export class Home extends StateLessComponent {
	protected appStores: any;

	constructor(protected fullStores: FullManager<{ [key: string]: any }>) {
		super({
			element: document.createElement("ul"),
		});

		this.appStores = fullStores.get().app.stores;
		this.appStores.modules.bind(this.update);
	}

	protected onUpdate(): void {
		const modules = this.appStores.modules.get();

		for (const mod of modules) {
			const ul = document.createElement("ul");
			ul.innerText = mod.name;
			this.element.appendChild(ul);
		}
	}
}
