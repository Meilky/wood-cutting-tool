import { Home } from "~/src/modules/home/components/home"
import { Module } from "~/src/interfaces/modules/module"

export const module: Module = {
	id: 0,
	name: "Home",
	component: new Home()
}
