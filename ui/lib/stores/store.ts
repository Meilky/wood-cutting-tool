import { Store } from "~/lib/interfaces/stores/store";

export abstract class BaseStore<T> implements Store<T> {
	public readonly base: Readonly<T>;

	protected value: T;
	protected listeners: (() => void)[];

	constructor(base: T) {
		this.base = base;
		this.value = base;
		this.listeners = [];

		this.set = this.set.bind(this);
		this.bind = this.bind.bind(this);
		this.unbind = this.unbind.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	public abstract init(): Promise<void>;

	public bind(callback: () => void): void {
		this.listeners.push(callback);
	}

	public unbind(callback: () => void): void {
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

	public get(): T {
		return this.value;
	}

	public set(value: T): void {
		this.value = Object.freeze(value);

		this.refresh();
	}
}
