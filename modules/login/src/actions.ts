import { UserActions } from "./interfaces/actions"
import { Dispatcher } from "./interfaces/dispatcher"

export class UserHandler {
	constructor(protected dispatcher: Dispatcher<UserActions>) { }

	public login(data: UserActions["login"]): void {
		this.dispatcher.dispatch({ type: "login", data })
	}
}
