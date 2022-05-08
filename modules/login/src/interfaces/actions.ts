import { Forms } from "./forms";
import { LoginData, SignupData } from "./user-data";

export interface PrivateActions extends PublicActions {
	login: LoginData;
	signup: SignupData;
	select_form: Forms
}

export interface PublicActions {
	test: string;
}
