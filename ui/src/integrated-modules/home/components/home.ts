import { StateLessComponent } from "~/lib/components/state-less-component";
import { StateFullComponent } from "~lib/components/state-full-component";
import { FullManager } from "~lib/interfaces/full-manager";
import { PublicStores } from "~lib/interfaces/modules/app/stores";
import { StoreManager } from "~/lib/interfaces/store-manager"
import { Module } from "~lib/interfaces/modules/module";
import { ActionCreator } from "~lib/interfaces/action-creator";

export class Home extends StateFullComponent<StoreManager<PublicStores>> {
	constructor(protected fullStores: FullManager<{ [key: string]: any }>, protected fullActions: FullManager<{ [key: string]: any }>) {
		super({
			element: document.createElement("ul"),
			storeManager: fullStores.get().app,
			binds: ["modules"]
		});

		this.stores.modules.bind(this.update);
	}

	protected beforeUpdate(): void {
		this.children = []
	}

	protected onUpdate(): void {
		const modules = this.stores.modules.get();

		for (const mod of modules) {
			this.children.push(new Mod(mod, this.fullStores.get()[mod.name], this.fullActions.get()[mod.name]))
		}
	}
}

class Mod extends StateLessComponent {
	constructor(protected module: Module, protected storeManager?: StoreManager<{ [key: string]: any }>, protected actions?: ActionCreator<{ [key: string]: any }>) {
		super({
			element: document.createElement("div")
		})

		this.children.push(new ModTitle(module.name));

		if (storeManager && Object.keys(storeManager.stores).length > 0) {
			this.children.push(new ListTitle("Stores"))

			for (const store in storeManager.stores) {
				this.children.push(new ModStore(store, storeManager));
			}
		}

		if (actions && actions.actions.length > 0) {
			this.children.push(new ListTitle("Stores"))
			this.children.push(new List(actions.actions as string[]))
		}
	}
}

class ModTitle extends StateLessComponent {
	constructor(title: string) {
		super({
			element: document.createElement("h1")
		})

		this.element.innerText = title;
	}
}

class ListTitle extends StateLessComponent {
	constructor(title: string) {
		super({
			element: document.createElement("h3")
		})

		this.element.innerText = title;
	}
}

class List extends StateLessComponent {
	constructor(items: string[]) {
		super({
			element: document.createElement("ul")
		})

		for (const item of items) {
			const holder = document.createElement("li")
			holder.innerText = item;

			this.element.appendChild(holder);
		}
	}
}

class ModStore extends StateFullComponent<StoreManager<{ [key: string]: any }>> {
	constructor(protected name: string, storeManager: StoreManager<{ [key: string]: any }>) {
		super({
			element: document.createElement("p"),
			storeManager,
			binds: [name]
		})
	}

	protected onUpdate(): void {
		this.element.innerText = `${this.name}: ${JSON.stringify(this.storeManager.stores[this.name].get())}`
	}
}
