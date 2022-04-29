import { UserData } from "./user-data";

export interface ModuleActions extends PublicModuleActions {
	login: UserData;
}

export interface PublicModuleActions {
	test: string;
}
