import { Component } from "~lib/components/component.I";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { StoreManager } from "~lib/interfaces/store-manager";
import { PrivateActionCreator } from "./actions";
import { App } from "./components/app";
import { ModuleDispatcher } from "./dispatcher";
import { PublicActions } from "./interfaces/actions";
import { PublicStores } from "./interfaces/stores";
import { PublicActionCreator } from "./public-actions";
import { PublicStoreManager } from "./public-store-manager";
import { PrivateStoreManager } from "./store-manager";

export const init = async (): Promise<{
	component: Component;
	actionCreator: ActionCreator<PublicActions>;
	storeManager: StoreManager<PublicStores>;
	css: string;
}> => {
	const dispatcher = new ModuleDispatcher();

	const privateStoreManager = new PrivateStoreManager(dispatcher);
	const publicStoreManager = new PublicStoreManager(privateStoreManager);

	await privateStoreManager.init();

	const privateActions = new PrivateActionCreator(dispatcher);
	const publicActions = new PublicActionCreator(privateActions, dispatcher);

	const appComponent = new App(privateActions, privateStoreManager);

	appComponent.update();

	return {
		component: appComponent,
		actionCreator: publicActions,
		storeManager: publicStoreManager,
		css: "/modules/login/index.css"
	};
};
