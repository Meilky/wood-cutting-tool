import { StateFullComponent } from "~/lib/components/state-full-component";
import { LoadedModule as LoadedModuleStyle } from "./style.module.css";
import { StateLessComponent } from "~/lib/components/state-less-component";
import appStoreManager, { AppStoreManager } from "~/src/store-manager";

export class LoadedModule extends StateFullComponent<AppStoreManager> {
	constructor() {
		super({
			element: document.createElement("div"),
			storeManager: appStoreManager,
			binds: ["loadedModule"],
		});

		this.element.className = LoadedModuleStyle;
	}

	protected onUpdate(): void {
		const mod = this.stores.loadedModule.get();

		if (mod.error) {
			this.children = [new ErrorModule({ msg: mod.error.msg })];
			return;
		}

		this.children = [mod.component];
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
