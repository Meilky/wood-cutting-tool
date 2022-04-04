import { TopBar as TopBarStyle } from "./style.module.css";
import { StateFullComponent } from "../../lib/components/state-full-component";
import LoadedModuleStore from "../../stores/loaded-module";
import ModulesStore from "../../stores/modules";

export class TopBar extends StateFullComponent<{
	loadedModule: typeof LoadedModuleStore
	modules: typeof ModulesStore
}> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				loadedModule: LoadedModuleStore,
				modules: ModulesStore
			}
		});

		this.element.className = TopBarStyle;
		this.init();
	}

	public init(): void {
		const loadedMod = this.stores.loadedModule.value;
		this.element.innerText = this.stores.modules.value[loadedMod].name;
	}

	protected onUpdate(): void {
		const loadedMod = this.stores.loadedModule.value;
		this.element.innerText = this.stores.modules.value[loadedMod].name;
	}
}
