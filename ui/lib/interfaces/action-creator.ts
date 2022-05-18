export interface ActionCreator<T extends { [key: string]: any }> {
	readonly actions: (keyof T)[];

	call<K extends keyof T>(action: K, data: T[K]): void;
}
