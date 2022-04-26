import { StateLessComponent } from "./state-less-component";
import { StateFullPropreties } from "./state-full-component.I";
import { StoreManager } from "~/lib/interfaces/store-manager";

export abstract class StateFullComponent<T extends StoreManager> extends StateLessComponent {
	protected stores: T;

	constructor(props: StateFullPropreties<T>) {
		super(props);
		this.stores = props.storeManager

		for (const store in props.binds) {
			props.storeManager[store].addListener(this.update);
		}

		this.update = this.update.bind(this);
	}
}
