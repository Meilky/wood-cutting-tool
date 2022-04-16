import { StateFullComponent } from "~/lib/components/state-full-component";
import { LoadedModule as LoadedModuleStyle } from "./style.module.css";
import LoadedModuleStore from "~/src/stores/loaded-module";
import { StateLessComponent } from "~/lib/components/state-less-component";

export class LoadedModule extends StateFullComponent<{
	loadedModule: typeof LoadedModuleStore;
}> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				loadedModule: LoadedModuleStore,
			},
		});

		this.element.className = LoadedModuleStyle;
	}

	protected beforeUpdate(): void {
		this.removeChildren()
	}

	protected onUpdate(): void {
		const mod = this.stores.loadedModule.value;

		if (mod.error) {
			this.children = [new ErrorModule({ msg: mod.error.msg })];
			return;
		}

		this.children = [mod.component];
	}

	protected afterUpdate(): void {
		this.appenChildren()
	}
}

interface ErrorModuleProps {
	msg: string;
}

class ErrorModule extends StateLessComponent {
	constructor(protected props: ErrorModuleProps) {
		super({
			element: document.createElement("p"),
		});

		this.element.className = LoadedModuleStyle;
		this.element.innerText = `${this.props.msg}`;
	}
}
