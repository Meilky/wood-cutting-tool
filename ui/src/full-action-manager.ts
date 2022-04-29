import { ActionCreator } from "~lib/interfaces/action-creator";
import { PublicAppActions } from "./interfaces/actions";
import publicAppActionCreator from "./public-actions";

export class FullActionManager {
	public readonly actions: {
		app: ActionCreator<PublicAppActions>
	};

	constructor() {
		this.actions = {
			app: publicAppActionCreator
		};
	}
}

export default new FullActionManager();
