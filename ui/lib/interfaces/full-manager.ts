export interface FullManager<T extends { [key: string]: any }> {
	set<K extends keyof T>(name: K, storeManager: T[K]): void;
	get(): T;
}
