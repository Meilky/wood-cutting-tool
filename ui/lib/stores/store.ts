import { Store } from "./store.I";

export abstract class BaseStore<T> implements Store<T> {
	protected _value: T;
	protected listeners: (() => void)[];

	public get value(): T {
		return this._value;
	}

	public set value(v: T) {
		this._value = v;

		this.refresh();
	}

	constructor(public readonly defaults: T) {
		this._value = defaults;
		this.listeners = [];
	}

	public abstract init(): Promise<void>;

	public addListener(callback: () => void): void {
		this.listeners.push(callback);
	}

	public removeListener(callback: () => void): void {
		const index = this.listeners.indexOf(callback);

		if (index !== -1) {
			this.listeners.splice(index, 1);
		}
	}

	public refresh(): void {
		for (const callback of this.listeners) {
			callback();
		}
	}
}
