import { Home } from "./components/home";
import { Module } from "~/lib/interfaces/modules/module";

export const module: Module = {
	id: 0,
	name: "Home",
	component: new Home(),
};
