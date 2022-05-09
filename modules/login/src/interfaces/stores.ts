import { UserStore } from "~/src/stores/user-store";
import { LoadedFormStore } from "~src/stores/loaded-form";
import { LoginStore } from "~src/stores/login";
import { SignupStore } from "~src/stores/signup";

export interface PrivateStores extends PublicStores {
	loadedForm: LoadedFormStore
	login: LoginStore,
	signup: SignupStore
}

export interface PublicStores {
	user: UserStore;
}
