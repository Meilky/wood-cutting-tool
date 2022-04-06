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

	protected beforeUpdate(): void {
		return;
	}

	public update(): void {
		if (this.isRendered()) {
			this.removeChildren();
			this.beforeUpdate();
			this.onUpdate();
			this.afterUpdate();
			this.appenChildren();
		} else {
			this.remove();
		}
	}

	protected abstract onUpdate(): void;

	protected afterUpdate(): void {
		return;
	}

	public remove(): void {
		for (const store in this.stores) {
			this.stores[store].removeListener(this.update);
		}

		super.remove();
	}
}
