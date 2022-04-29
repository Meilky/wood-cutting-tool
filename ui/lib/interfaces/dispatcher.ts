export interface Dispatcher<T extends { [key: string]: any }> {
	bind(actions: {
		[K in keyof T]: (value: T[K]) => void;
	}): void;

	dispatch<K extends keyof T>(action: { type: K; data: T[K] }): void;
}
