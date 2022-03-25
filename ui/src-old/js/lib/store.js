export class Store {
	_value;
	listeners;

	get value() {
		return this._value;
	}

	set value(v) {
		this._value = v;

		for (const c of this.listeners) {
			c();
		}
	}

	constructor(defaultValue) {
		this.listeners = [];
		this._value = defaultValue;
	}

	addListener(listener) {
		this.listeners.push(listener);
	}

	removeListener(listener) {
		const id = this.listeners.findIndex(listener);

		if (id !== -1) this.listeners = this.listeners.splice(id, 1);
	}
}
