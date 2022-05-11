import { StateLessComponent } from "~/lib/components/state-less-component";
import { StateFullComponent } from "~lib/components/state-full-component";
import { FullManager } from "~lib/interfaces/full-manager";
import { PublicStores } from "~lib/interfaces/modules/app/stores";
import { StoreManager } from "~/lib/interfaces/store-manager"
import { Module } from "~lib/interfaces/modules/module";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { PublicActions } from "~lib/interfaces/modules/app/actions";

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
			this.children.push(new Mod(mod, this.fullStores, this.fullActions.get().app))
		}
	}
}

class Mod extends StateLessComponent {
	constructor(protected module: Module, protected fullStores: FullManager<{ [key: string]: any }>, protected actions: ActionCreator<PublicActions>) {
		super({
			element: document.createElement("li")
		})

		this.element.innerText = module.name
		const stores = fullStores.get()

		if (stores.Login && stores.Login.stores.user.get()) {
			this.element.innerText += stores.Login.stores.user.get().username
		}

		this.onClick = this.onClick.bind(this);
		this.element.onclick = this.onClick;
	}

	protected onClick(): void {
		this.actions.call("select_module", this.module)
	}
}
