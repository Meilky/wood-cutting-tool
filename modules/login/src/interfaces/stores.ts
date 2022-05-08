import { UserStore } from "~/src/stores/user-store";
import { LoadedFormStore } from "~src/stores/loaded-form";

export interface PrivateStores extends PublicStores {
	loadedForm: LoadedFormStore
}

export interface PublicStores {
	user: UserStore;
}
