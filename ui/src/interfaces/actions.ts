import { Module } from "~lib/interfaces/modules/module";

export interface PrivateActions extends PublicActions {};

export interface PublicActions {
	select_module: Module;
}
