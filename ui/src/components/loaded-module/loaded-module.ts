import { StateFullComponent } from "~/lib/components/state-full-component";
import { LoadedModule as LoadedModuleStyle } from "./style.module.css";
import LoadedModuleStore from "~/src/stores/loaded-module";
import ModulesStore from "~/src/stores/modules";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { Module } from "~/src/stores/stores.I";

export class LoadedModule extends StateFullComponent<{
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

		this.init();
	}

	public init(): void {
		this.element.className = LoadedModuleStyle;
		this.update();
	}

	protected onUpdate(): void {
		const loadedModule = this.stores.loadedModule.value;
		let mod: Module = {} as Module;

		for (const m of this.stores.modules.value) {
			if (m.id == loadedModule) {
				mod = m;
			}
		}

		this.children = [mod.component || new ErrorModule({ msg: mod.msg || "no message", state: mod.state })];
	}
}

interface ErrorModuleProps {
	state: string;
	msg: string;
}

class ErrorModule extends StateLessComponent {
	constructor(protected props: ErrorModuleProps) {
		super({
			element: document.createElement("p"),
		});

		this.init();
	}

	public init(): void {
		this.element.className = LoadedModuleStyle;
		this.element.innerText = `${this.props.state}: ${this.props.msg}`;
	}
}
