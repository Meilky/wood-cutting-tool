export interface Dispatcher<T extends { [key: string]: any }> {
	bind<K extends keyof T>(action: K, callback: (value: T[K]) => void): void;

	dispatch<K extends keyof T>(action: { type: K; data: T[K] }): void;
}
