import { TopBar as TopBarStyle } from "./style.module.css";
import { StateFullComponent } from "~/lib/components/state-full-component";
import LoadedModuleStore from "~/src/stores/loaded-module";

export class TopBar extends StateFullComponent<{ loadedModule: typeof LoadedModuleStore }> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				loadedModule: LoadedModuleStore,
			},
		});

		this.element.className = TopBarStyle;
		this.init();
	}

	public init(): void {
		this.update();
	}

	protected beforeUpdate(): void {
		this.element.style.color = "var(--th-light)";
	}

	protected onUpdate(): void {
		const mod = this.stores.loadedModule.value;

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
