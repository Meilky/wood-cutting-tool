export interface StoreManager<T> {
	readonly stores: T;

	init(): Promise<void>;
}
