import { Component, Propreties, DefaultProps, Props } from "./component.I";

const defaultProps: DefaultProps = {
	render: {
		mobile: true,
		desktop: true,
	},
};

export abstract class StateLessComponent implements Component {
	protected element: HTMLElement;
	protected children: Component[];
	protected isMobile: boolean;

	public readonly propreties: Propreties;

	constructor(props: Props) {
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		this.children = [];
		this.element = props.element;
		this.propreties = { ...props, ...defaultProps };
		this.init = this.init.bind(this);
		this.remove = this.remove.bind(this);
	}

	public abstract init(): void;

	protected beforeRemove(): void {
		return;
	}

	public remove(): void {
		this.beforeRemove();
		this.removeChildren();
		this.removeElement();
		this.afterRemove();
	}

	protected removeChildren(): void {
		for (const child of this.children) child.remove();
	}

	protected removeElement(): void {
		if (this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
	}

	protected afterRemove(): void {
		return;
	}

	public get(): HTMLElement {
		return this.element;
	}

	protected isRendered(): boolean {
		return (this.isMobile && this.propreties.render.mobile) || (!this.isMobile && this.propreties.render.desktop);
	}

	protected appenChildren(): void {
		for (const child of this.children) {
			child.init()
			this.element.append(child.get());
		}
	}
}
