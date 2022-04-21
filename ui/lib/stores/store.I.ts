export interface Store<T> {
	value: T;
	readonly defaults: T;

	init(): void;
	addListener(c: () => void): void;
	removeListener(c: () => void): void;
}
