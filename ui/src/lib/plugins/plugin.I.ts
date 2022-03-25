import { NavBar } from "components/nav-bar/nav-bar";
import { Component } from "lib/components/component.I";

export interface PluginConfig {
	name: string
	description: string
	component: Component
	navbar?: NavBar
}

export interface Plugin {
	readonly name: string
	readonly description: string
	readonly component: Component
	readonly navbar?: NavBar
}
