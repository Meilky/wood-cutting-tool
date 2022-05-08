export interface Store<G, S = G> {
	readonly base: G;

	init(): Promise<void>;
	bind(callback: () => void): void;
	unbind(callback: () => void): void;
	get(): G;
	set(value: S): void;
}
