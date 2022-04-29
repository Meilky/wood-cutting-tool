import publicAppActionCreator from "./public-actions";

export class FullActionManager {
	public readonly actions: any;

	constructor() {
		this.actions = {};

		this.bind("app", publicAppActionCreator);
	}

	public bind(name: string, actions: any): void {
		this.actions[name] = actions;
	}
}
