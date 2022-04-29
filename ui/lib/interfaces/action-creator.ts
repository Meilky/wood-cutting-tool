export interface ActionCreator<T extends { [key: string]: any }> {
	call<K extends keyof T>(action: K, data: T[K]): void;
}
