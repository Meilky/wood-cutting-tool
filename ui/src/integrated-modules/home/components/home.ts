import { StateLessComponent } from "~/lib/components/state-less-component";
import { StateFullComponent } from "~lib/components/state-full-component";
import { FullManager } from "~lib/interfaces/full-manager";
import { PublicStores } from "~lib/interfaces/modules/app/stores";
import { StoreManager } from "~/lib/interfaces/store-manager";
import { Module } from "~lib/interfaces/modules/module";
import { ActionCreator } from "~lib/interfaces/action-creator";
import { Component } from "~lib/components/component.I";
import {
	Container as ContainerStyle,
	LargeTitle as LargeTitleStyle,
	MediumTitle as MediumTitleStyle,
	SmallTitle as SmallTitleStyle,
	Home as HomeStyle,
	InnerContainer as InnerContainerStyle,
} from "./home.module.css";

export class Home extends StateFullComponent<StoreManager<PublicStores>> {
	constructor(
		protected fullStores: FullManager<{ [key: string]: any }>,
		protected fullActions: FullManager<{ [key: string]: any }>
	) {
		super({
			element: document.createElement("div"),
			storeManager: fullStores.get().app,
			binds: ["modules"],
		});

		this.element.className = HomeStyle;
		this.stores.modules.bind(this.update);
	}

	protected beforeUpdate(): void {
		this.children = [];
	}

	protected onUpdate(): void {
		const modules = this.stores.modules.get();

		for (const mod of modules) {
			const modFullStores = this.fullStores.get()[mod.name];
			const modFullActions = this.fullActions.get()[mod.name];

			if (modFullStores || modFullActions) {
				this.children.push(new Mod(mod, modFullStores, modFullActions));
			}
		}
	}
}

class Mod extends StateLessComponent {
	constructor(
		protected module: Module,
		protected storeManager?: StoreManager<{ [key: string]: any }>,
		protected actions?: ActionCreator<{ [key: string]: any }>
	) {
		super({
			element: document.createElement("div"),
		});

		this.element.className = ContainerStyle;

		this.children = [new Title({ content: module.name, size: "large", className: LargeTitleStyle })];

		if (storeManager && storeManager.stores) {
			this.children.push(new ModContent(storeManager));
		}

		if (actions && actions.actions.length > 0) {
			this.children.push(
				new Container({
					title: {
						size: "medium",
						content: "Actions :",
						className: MediumTitleStyle,
					},
					content: new List(actions.actions as string[]),
				})
			);
		}
	}
}

class ModContent extends StateLessComponent {
	constructor(storeManager: StoreManager<{ [key: string]: any }>) {
		super({
			element: document.createElement("div"),
		});

		this.element.className = InnerContainerStyle;
		this.children = [new Title({ content: "Stores :", size: "medium", className: MediumTitleStyle })];

		for (const store in storeManager.stores) {
			this.children.push(
				new Container({
					title: { content: store, size: "small" },
					content: new JsonHolder({ name: store, storeManager }),
				})
			);
		}
	}
}

class Container extends StateLessComponent {
	constructor(props: { title: TitleProps; content: Component }) {
		super({
			element: document.createElement("div"),
		});

		this.element.className = ContainerStyle;

		if (!props.title.className) {
			props.title.className = SmallTitleStyle;
		}

		this.children = [new Title(props.title), props.content];
	}
}

interface JsonHolderProps {
	storeManager: StoreManager<{ [key: string]: any }>;
	name: string;
	className?: string;
}

class JsonHolder extends StateFullComponent<StoreManager<{ [key: string]: any }>> {
	constructor(protected props: JsonHolderProps) {
		super({
			element: document.createElement("code"),
			storeManager: props.storeManager,
			binds: [props.name],
		});
	}

	protected onUpdate(): void {
		this.element.innerText = JSON.stringify(this.storeManager.stores[this.props.name].get(), null, 4);
	}
}

interface TitleProps {
	content: string;
	size: "small" | "medium" | "large";
	className?: string;
}

class Title extends StateLessComponent {
	constructor(props: TitleProps) {
		let e = {} as HTMLElement;

		switch (props.size) {
			case "small":
				e = document.createElement("h3");
				break;
			case "medium":
				e = document.createElement("h2");
				break;
			case "large":
				e = document.createElement("h1");
				break;
		}

		super({
			element: e,
		});

		if (props.className) this.element.className = props.className;
		this.element.innerText = props.content;
	}
}

class List extends StateLessComponent {
	constructor(items: string[]) {
		super({
			element: document.createElement("ul"),
		});

		if (items.length === 0) {
			this.element.innerText = "n/a";
		}

		for (const item of items) {
			const holder = document.createElement("li");
			holder.innerText = item;

			this.element.appendChild(holder);
		}
	}
}
