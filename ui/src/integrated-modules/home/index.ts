import { Home } from "./components/home";
import { Module } from "~/lib/interfaces/modules/module";
import { Component } from "~lib/components/component.I";
import { FullManager } from "~lib/interfaces/full-manager";

export const module: Module = {
	id: 0,
	name: "Home",
	component: {} as Component,
};

export const init = async (
	fullActions: FullManager<{ [key: string]: any }>,
	fullStores: FullManager<{ [key: string]: any }>
): Promise<{ component: Component }> => {
	return {
		component: new Home(fullStores),
	};
};
