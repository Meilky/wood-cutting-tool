import { Component } from "~/lib/components/component.I";

export interface Module {
	id: number;
	name: string;
	description: string;
	component: Component;

	fetching?: {
		id: number;
		origin: string;
	};
	error?: {
		state: "error" | "warning";
		msg: string;
	}
}
