import { Module } from "~lib/interfaces/modules/module";

export type AppActions = PublicAppActions;

export interface PublicAppActions {
	select_module: Module;
}
