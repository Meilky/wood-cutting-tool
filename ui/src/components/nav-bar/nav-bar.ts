import { StateFullComponent } from "~/lib/components/state-full-component";
import { Module } from "~/lib/interfaces/modules/module";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { NavBar as NavBarStyle, NavBarItem as NavBarItemStyle } from "./style.module.css";
import appStoreManager, { AppStoreManager, AppStores } from "~/src/store-manager";

export class NavBar extends StateFullComponent<AppStoreManager> {
	constructor() {
		super({
			element: document.createElement("div"),
			storeManager: appStoreManager,
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

			this.children.push(new NavBarItem({ module: mod, isLoaded, stores: this.stores }));
		}
	}
}

interface NavBarItemProps {
	module: Module;
	isLoaded?: boolean;
	stores: AppStores;
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
		this.props.stores.loadedModule.set(this.props.module);
	}
}
