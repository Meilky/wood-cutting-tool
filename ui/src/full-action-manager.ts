import { PublicAppActions } from "./interfaces/actions"
import { ActionCreator } from "~/lib/interfaces/action-creator"
import publicAppActionCreator from "./public-actions"

interface Actions {
	app: ActionCreator<PublicAppActions>,
}

export class FullActionManager {
	public readonly actions: Actions

	constructor() {
		this.actions = {
			app: publicAppActionCreator,
		}
	}
}
