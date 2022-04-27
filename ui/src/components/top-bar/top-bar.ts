import { TopBar as TopBarStyle } from "./style.module.css";
import { StateFullComponent } from "~/lib/components/state-full-component";
import defaultStoreManager, { DefaultStoreManager } from "~/lib/default-store-manager";

export class TopBar extends StateFullComponent<DefaultStoreManager> {
	constructor() {
		super({
			element: document.createElement("div"),
			storeManager: defaultStoreManager,
			binds: ["loadedModule"]
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
