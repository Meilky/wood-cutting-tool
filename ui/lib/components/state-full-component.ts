import { BaseStore } from "../stores/store";
import { StateLessComponent } from "./state-less-component";
import { StateFullPropreties } from "./state-full-component.I";

export abstract class StateFullComponent<T extends { [key: string]: BaseStore<any> }> extends StateLessComponent {
	protected stores: T;

	constructor(props: StateFullPropreties<T>) {
		super(props);
		this.stores = props.stores;

		this.update = this.update.bind(this);

		for (const store in this.stores) {
			this.stores[store].addListener(this.update);
		}
	}
}
