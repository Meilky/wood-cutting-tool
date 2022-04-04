import { StateFullComponent } from "../../lib/components/state-full-component";
import { LoadedModule as LoadedModuleStyle } from "./style.module.css"
import LoadedModuleStore from "../../stores/loaded-module";
import ModulesStore from "../../stores/modules";

export class LoadedModule extends StateFullComponent<{
	loadedModule: typeof LoadedModuleStore,
	modules: typeof ModulesStore
}> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				loadedModule: LoadedModuleStore,
				modules: ModulesStore,
			}
		});

		this.init();
	}

	public init(): void {
		this.element.className = LoadedModuleStyle;
		this.update()
	}

	protected onUpdate(): void {
		const loadedModule = this.stores.loadedModule.value;
		this.element.innerHTML = `<p>joe's ${this.stores.modules.value[loadedModule].name}</p>`
	}
}
