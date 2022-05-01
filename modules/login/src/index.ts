import { Component } from "~lib/components/component.I";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { StoreManager } from "~lib/interfaces/store-manager";
import { App } from "./components/app";
import { PublicModuleActions } from "./interfaces/actions";
import { PublicModuleStores } from "./interfaces/stores";
import publicModuleActionCreator from "./public-actions";
import publicModuleStoreManager from "./public-store-manager";

interface FullStores {
	app: StoreManager<any>;
}

interface FullActions {
	app: StoreManager<any>;
}

export const init = (
	fullActions: FullActions,
	fullStores: FullStores
): {
	component: Component;
	actionCreator: ActionCreator<PublicModuleActions>;
	storeManager: StoreManager<PublicModuleStores>;
} => {
	const appComponent = new App();

	appComponent.update();

	return {
		component: appComponent,
		actionCreator: publicModuleActionCreator,
		storeManager: publicModuleStoreManager,
	};
};
