import { Forms } from "./forms";
import { LoginData, SignupData, UserData } from "./user-data";

export interface PrivateActions extends PublicActions {
	login: LoginData;
	signup: SignupData;
	set_user: UserData;
	get_user: undefined;
	select_form: Forms;
}

export interface PublicActions {
}
