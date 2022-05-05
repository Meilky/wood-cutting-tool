import { StateLessComponent } from "~lib/components/state-less-component";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { PrivateActions } from "~src/interfaces/actions";
import { FullManager } from "~/lib/interfaces/full-manager";
import { StoreManager } from "~lib/interfaces/store-manager";

interface FullStores {
	app: StoreManager<any>;
}

interface FullActions {
	app: ActionCreator<any>;
}

export class App extends StateLessComponent {
	constructor(
		protected actions: ActionCreator<PrivateActions>,
		protected fullActions: FullManager<FullActions>,
		protected fullStores: FullManager<FullStores>
	) {
		super({ element: document.createElement("button") });

		this.onClick = this.onClick.bind(this);

		this.element.onclick = this.onClick;
		this.element.innerText = "Reselect the home page";
	}

	protected onClick(): void {
		this.fullActions.get().app.call("select_module", this.fullStores.get().app.stores.modules.get()[0]);
	}
}
