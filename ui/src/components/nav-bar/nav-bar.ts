import { StateFullComponent } from "~/lib/components/state-full-component";
import { Module } from "~/lib/interfaces/modules/module";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { NavBar as NavBarStyle, NavBarItem as NavBarItemStyle } from "./style.module.css";
import { PrivateStores } from "~/src/store-manager";
import { StoreManager } from "~lib/interfaces/store-manager";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { PrivateActions } from "~src/interfaces/actions";

export class NavBar extends StateFullComponent<StoreManager<PrivateStores>> {
	constructor(privateStoresManager: StoreManager<PrivateStores>, protected privateActions: ActionCreator<PrivateActions>) {
		super({
			element: document.createElement("div"),
			storeManager: privateStoresManager,
			binds: ["loadedModule", "modules"],
		});

		this.element.className = NavBarStyle;
	}

	protected beforeUpdate(): void {
		this.children = [];
	}

	protected onUpdate(): void {
		const modules = this.stores.modules.get();
		const loadedMod = this.stores.loadedModule.get();

		for (const mod of modules) {
			let isLoaded = false;

			if (mod.id == loadedMod.id) {
				isLoaded = true;
			}

			this.children.push(new NavBarItem({ module: mod, isLoaded, stores: this.stores, actions: this.privateActions }));
		}
	}
}

interface NavBarItemProps {
	module: Module;
	isLoaded?: boolean;
	stores: PrivateStores;
	actions: ActionCreator<PrivateActions>
}

class NavBarItem extends StateLessComponent {
	constructor(protected props: NavBarItemProps) {
		super({
			element: document.createElement("div"),
		});

		this.onClick = this.onClick.bind(this);

		const html = `<span><p>${this.props.module.name}</p></span>`;

		this.element.className = NavBarItemStyle;
		this.element.onclick = this.onClick;
		this.element.style.color = "var(--th-light)";

		if (this.props.isLoaded) {
			this.element.style.backgroundColor = "var(--th-gray-700)";
		}

		if (this.props.module.error) {
			switch (this.props.module.error.state) {
				case "error":
					this.element.style.color = "var(--th-danger)";
					break;
				case "warning":
					this.element.style.color = "var(--th-warning)";
					break;
			}
		}

		this.element.innerHTML = html;
	}

	protected onClick(): void {
		this.props.actions.call("select_module", this.props.module);
	}
}
