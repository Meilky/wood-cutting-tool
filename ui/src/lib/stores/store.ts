import { Store } from "./store.I";

export abstract class BaseStore<T> implements Store<T> {
	protected _value: T;
	protected listeners: ((value: any) => void)[];

	public get value(): T {
		return this._value;
	}

	public set value(v: T) {
		this._value = v;
		this.refresh()
	}

	constructor(defaultValue: T) {
		this._value = defaultValue;
		this.listeners = [];
	}

	public abstract init(): void;

	public addListener(callback: () => void): void {
		this.listeners.push(callback);
	}

	public removeListener(callback: () => void): void {
		const index = this.listeners.indexOf(callback);

		if (index !== -1) this.listeners.splice(index, 1);
	}

	public refresh():void {
		for (const callback of this.listeners) {
			callback(this._value);
		}
	}
}
