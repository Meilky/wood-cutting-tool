import { TopBar as TopBarStyle } from "./style.module.css";
import { StateFullComponent } from "~/lib/components/state-full-component";
import appStoreManager, { AppStoreManager } from "~/src/store-manager";

export class TopBar extends StateFullComponent<AppStoreManager> {
	constructor() {
		super({
			element: document.createElement("div"),
			storeManager: appStoreManager,
			binds: ["loadedModule"],
		});

		this.element.className = TopBarStyle;
	}

	protected beforeUpdate(): void {
		this.element.style.color = "var(--th-light)";
	}

	protected onUpdate(): void {
		const mod = this.stores.loadedModule.get();

		this.element.innerText = mod.name;

		if (mod.error) {
			switch (mod.error.state) {
				case "error":
					this.element.style.color = "var(--th-danger)";
					break;
				case "warning":
					this.element.style.color = "var(--th-warning)";
					break;
			}
		}
	}
}
