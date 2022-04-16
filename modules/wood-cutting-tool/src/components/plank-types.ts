import { StateFullComponent } from "~/lib/components/state-full-component";
import { StateLessComponent } from "~/lib/components/state-less-component";
import PlankTypesStore from "~/src/stores/plank-types";
//import { PlankType } from "~/src/interfaces/plank-type";
import { PlanTypes as PlankTypesStyle } from "./plank-types.module.css"
import { Component } from "~lib/components/component.I";

export class PlankTypes extends StateFullComponent<{ plankTypes: typeof PlankTypesStore }> {
	protected holder: List = new List({ className: "none" });
	constructor() {
		super({
			element: document.createElement("ul"),
			stores: { plankTypes: PlankTypesStore },
		});

		this.element.className = PlankTypesStyle;
		this.children = [new Name("Plank Types"), this.holder];
	}

	public onUpdate(): void {
		const listItems: ListItemProps[] = [];

		for (const plank of this.stores.plankTypes.value) {
			listItems.push({ item: plank.name })
		}

		this.holder.set(listItems);
	}
}

interface ListItemProps {
	item: string | Component,
	className?: string,
}

interface ListProps {
	className: string,
}

class List extends StateLessComponent {
	protected items: ListItemProps[] = [];

	constructor(protected props: ListProps) {
		super({
			element: document.createElement("ul"),
		});

		this.element.className = this.props.className;
	}

	protected beforeUpdate(): void {
		this.children = [];
	}

	protected onUpdate(): void {
		for (const item of this.items) {
			const e = new ListItem(item);
			this.children.push(e);
		}
	}

	public update(): void {
		this.removeChildren()
		this.beforeUpdate()
		this.onUpdate()
		this.appenChildren()
	}

	public set(items: ListItemProps[]): void {
		this.items = items;
		this.update();
	}
}

class Name extends StateLessComponent {
	constructor(protected name: string) {
		super({
			element: document.createElement("div"),
		});
	}

	public init(): void {
		this.element.className = "name";
		this.element.innerText = this.name;
	}
}

class ListItem extends StateLessComponent {
	constructor(protected props: ListItemProps) {
		super({
			element: document.createElement("li"),
		});
	}

	public init(): void {
		if (this.props.className) this.element.className = this.props.className;

		if (typeof this.props.item === "string") this.element.innerText = this.props.item;
		else this.children = [this.props.item];

		this.appenChildren();
	}
}
