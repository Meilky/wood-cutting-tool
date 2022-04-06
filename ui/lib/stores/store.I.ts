export interface Store<T> {
	value: T;
	init(): void;
	addListener(c: () => void): void;
	removeListener(c: () => void): void;
}
