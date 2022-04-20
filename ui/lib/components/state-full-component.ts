import { BaseStore } from "../stores/store";
import { StateLessComponent } from "./state-less-component";
import { StateFullPropreties } from "./state-full-component.I";

export abstract class StateFullComponent<T extends { [key: string]: BaseStore<any> }> extends StateLessComponent {
	protected stores: { [K in keyof T]: T[K] };

	constructor(props: StateFullPropreties<T>) {
		super(props);

		const stores: any = {};

		for (const store in props.stores) {
			stores[store] = props.stores[store].store;

			if (props.stores[store].bind) {
				props.stores[store].store.addListener(this.update);
			}
		}

		this.stores = stores;

		this.update = this.update.bind(this);
	}
}
