import { NavBar } from "components/nav-bar/nav-bar"
import { Component } from "lib/components/component.I"
import {Plugin, PluginConfig} from "./plugin.I"

export class BasePlugin implements Plugin {
	public readonly name: string
	public readonly description: string

	public readonly component: Component
	public readonly navbar?: NavBar

	constructor(protected config: PluginConfig){
		this.name = config.name
		this.description = config.description

		this.component = config.component;
		this.navbar = config.navbar;
	}
}
