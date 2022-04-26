export interface Store<T> {
	readonly defaults: T;

	init(): void;
	addListener(c: () => void): void;
	removeListener(c: () => void): void;
	get(): T;
	set(value: T): void;
}
