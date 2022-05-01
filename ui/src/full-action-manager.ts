import publicAppActionCreator from "./public-actions";

export class FullActionManager {
	protected actions: { [key: string]: any };

	constructor() {
		this.actions = {
			app: publicAppActionCreator
		};
	}

	public set(name: string, actionCreator: any): void {
		if (this.actions[name]) {
			console.error(`There is already an actionCreator defiend to this name "${name}"!`)
			return;
		}

		this.actions[name] = actionCreator;
	}

	public get(): { [key: string]: any } {
		return this.actions;
	}
}

export default new FullActionManager();
