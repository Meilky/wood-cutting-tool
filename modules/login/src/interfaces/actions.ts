import { LoginData, SignupData } from "./user-data";

export interface PrivateActions extends PublicActions {
	login: LoginData;
	signup: SignupData;
}

export interface PublicActions {
	test: string;
}
