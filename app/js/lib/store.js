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
}
