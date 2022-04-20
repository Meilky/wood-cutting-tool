import { StateFullComponent } from "~/lib/components/state-full-component";
import { StateLessComponent } from "~/lib/components/state-less-component";
import PlankTypesStore from "~/src/stores/plank-types";
//import { PlankType } from "~/src/interfaces/plank-type";
import { PlanTypes as PlankTypesStyle } from "./plank-types.module.css"
import { Component } from "~/lib/components/component.I";

export class PlankTypes extends StateLessComponent {
	constructor() {
		super({
			element: document.createElement("div"),
		});

		this.element.className = PlankTypesStyle;
		this.children = [new Name("Plank Types"), new List({ className: "idk" })];
	}
}

class Name extends StateLessComponent {
	constructor(protected name: string) {
		super({
			element: document.createElement("div"),
		});

		this.element.className = "name";
		this.element.innerText = this.name;
	}
}

interface ListItemProps {
	item: string | Component,
	className?: string,
}

interface ListProps {
	className: string,
}

class List extends StateFullComponent<{ plankTypes: typeof PlankTypesStore }> {
	constructor(protected props: ListProps) {
		super({
			element: document.createElement("ul"),
			stores: { plankTypes: { store: PlankTypesStore, bind: true } },
		});

		this.element.className = this.props.className;
	}

	protected beforeUpdate(): void {
		this.children = [];
	}

	protected onUpdate(): void {
		for (const plank of this.stores.plankTypes.value) {
			const e = new ListItem({ item: plank.name });
			this.children.push(e);
		}
	}
}


class ListItem extends StateLessComponent {
	constructor(protected props: ListItemProps) {
		super({
			element: document.createElement("li"),
		});

		if (this.props.className) this.element.className = this.props.className;

		if (typeof this.props.item === "string") this.element.innerText = this.props.item;
		else this.children = [this.props.item];
	}
}
