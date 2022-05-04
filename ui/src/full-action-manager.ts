export class FullActionManager {
	protected actions: { [key: string]: any };

	constructor() {
		this.actions = {};
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
