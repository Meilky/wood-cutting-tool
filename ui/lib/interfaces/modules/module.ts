import { Component } from "~/lib/components/component.I";
import { Store } from "../stores/store";

export interface Module {
	id: number;
	name: string;
	component: Component;

	fetching?: {
		id: number;
		origin: string;
		css?: string;
	};
	error?: {
		state: "error" | "warning";
		msg: string;
	};
}

export interface ExportedModules {
	component: Component,
	css?: string,
	actions?: Enumerator,
	stores?: { [key: string]: Store<any> },
}
