import { UserData } from "./user-data";

export interface PrivateActions extends PublicActions {
	login: UserData;
}

export interface PublicActions {
	test: string;
}
