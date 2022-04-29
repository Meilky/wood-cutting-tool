import { Module } from "~lib/interfaces/modules/module"

export interface AppActions extends PublicAppActions {
}

export interface PublicAppActions {
	select_module: Module
}
