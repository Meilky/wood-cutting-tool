import { UserStore } from "~/src/stores/user-store";

export interface PrivateStores extends PublicStores {}

export interface PublicStores {
	user: UserStore;
}
