import { Home } from "./components/home";
import { Module } from "~/lib/interfaces/modules/module";
import { Component } from "~lib/components/component.I";

export const module: Module = {
	id: 0,
	name: "Home",
	component: {} as Component,
};

export const init = async (): Promise<{ component: Component }> => {
	return {
		component: new Home()
	}
}
