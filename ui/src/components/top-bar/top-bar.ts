import { TopBar as TopBarStyle } from "./style.module.css";
import { StateFullComponent } from "../../lib/components/state-full-component";
import LoadedModuleStore from "../../stores/loaded-module";
import ModulesStore from "../../stores/modules";
import { Module } from "../../stores/stores.I";

export class TopBar extends StateFullComponent<{
	loadedModule: typeof LoadedModuleStore;
	modules: typeof ModulesStore;
}> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				loadedModule: LoadedModuleStore,
				modules: ModulesStore,
			},
		});

		this.element.className = TopBarStyle;
		this.init();
	}

	public init(): void {
		this.update();
	}

	protected onUpdate(): void {
		const loadedMod = this.stores.loadedModule.value;
		let mod: Module = {} as Module;

		for (const m of this.stores.modules.value) {
			if (m.id == loadedMod) {
				mod = m;
			}
		}

		switch (mod.state) {
			case "error":
				this.element.style.color = "var(--th-danger)";
				break;
			case "warning":
				this.element.style.color = "var(--th-warning)";
				break;
			default:
				this.element.style.color = "var(--th-light)";
				break;
		}

		this.element.innerText = mod.name;
	}
}
