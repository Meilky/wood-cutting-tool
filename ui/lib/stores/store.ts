import { Store } from "~/lib/interfaces/stores/store";

export abstract class BaseStore<T> implements Store<T> {
	protected value: T;
	protected listeners: (() => void)[];

	constructor(public readonly defaults: T) {
		this.value = defaults;
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

	public get(): T {
		return this.value;
	}

	public set(value: T): void {
		this.value = value;

		this.refresh();
	}
}
