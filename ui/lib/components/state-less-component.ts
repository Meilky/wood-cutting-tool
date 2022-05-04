import { Component, Propreties, DefaultProps, Props } from "./component.I";

const defaultProps: DefaultProps = {
	render: {
		mobile: true,
		desktop: true,
	},
};

export class StateLessComponent implements Component {
	protected element: HTMLElement;
	protected children: Component[];
	protected isMobile: boolean;

	public readonly propreties: Propreties;

	constructor(props: Props) {
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		this.children = [];
		this.element = props.element;
		this.propreties = { ...props, ...defaultProps };

		this.update = this.update.bind(this);
		this.removeChildren = this.removeChildren.bind(this);
	}

	protected beforeUpdate(): void {
		return;
	}

	public update(): void {
		this.removeChildren();
		this.beforeUpdate();
		this.onUpdate();
		this.afterUpdate();
		this.appenChildren();
	}

	protected afterUpdate(): void {
		return;
	}

	protected onUpdate(): void {
		return;
	}

	protected beforeRemove(): void {
		return;
	}

	public removeChildren(): void {
		for (const child of this.children) {
			if (this.element.contains(child.get())) this.element.removeChild(child.get());
		}
	}

	public get(): HTMLElement {
		return this.element;
	}

	protected isRendered(): boolean {
		return (this.isMobile && this.propreties.render.mobile) || (!this.isMobile && this.propreties.render.desktop);
	}

	protected appenChildren(): void {
		for (const child of this.children) {
			child.update();
			this.element.append(child.get());
		}
	}
}
