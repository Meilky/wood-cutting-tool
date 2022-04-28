export interface Store<G,S = G> {
	readonly defaults: G;

	init(): Promise<void>;
	bind(callback: () => void): void;
	unbind(callback: () => void): void;
	get(): G;
	set(value: S): void;
}
