import { StateLessComponent } from "./state-less-component";
import { StateFullPropreties } from "./state-full-component.I";
import { StoreManager } from "~/lib/interfaces/store-manager";

export abstract class StateFullComponent<T extends StoreManager<any>> extends StateLessComponent {
	protected stores: T["stores"];
	protected storeManager: T;

	constructor(props: StateFullPropreties<T>) {
		super(props);
		this.stores = props.storeManager.stores;
		this.storeManager = props.storeManager;

		for (const store of props.binds) {
			this.stores[store].addListener(this.update);
		}

		this.update = this.update.bind(this);
	}
}
