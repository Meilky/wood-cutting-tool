import { Component } from "../lib/components/component.I"

export interface Module {
	id: number;
	order: number;
	name: string;
	description: string;
	path?: string;
	component?: Component;
	state: "nothing"|"error"|"warning",
	msg?: string
}

export type Modules = Module[];
