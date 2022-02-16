import { Component } from "./component.js";

export class StateFullComponent extends Component {
	stores;

	constructor(options) {
		super(options);

		this.stores = options.stores;

		for (const store in this.stores) {
			this.stores[store].addListener(this.update);
		}
	}

	destroy() {
		for (const store in this.stores) {
			this.stores[store].removeListener(this.update);
		}

		super.destroy();
	}
}
