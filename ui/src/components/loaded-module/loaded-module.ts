import { StateFullComponent } from "~/lib/components/state-full-component";
import { LoadedModule as LoadedModuleStyle } from "./style.module.css";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { PrivateStores } from "~/src/store-manager";
import { StoreManager } from "~lib/interfaces/store-manager";

export class LoadedModule extends StateFullComponent<StoreManager<PrivateStores>> {
	constructor(privateStoresManager: StoreManager<PrivateStores>) {
		super({
			element: document.createElement("div"),
			storeManager: privateStoresManager,
			binds: ["loadedModule"],
		});

		this.element.className = LoadedModuleStyle;
	}

	protected onUpdate(): void {
		const mod = this.stores.loadedModule.get();
		if (mod) {
			if (mod.error) {
				this.children = [new ErrorModule({ msg: mod.error.msg })];
				return;
			}

			this.children = [mod.component];
		}
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
