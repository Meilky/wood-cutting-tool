import { Component } from "../lib/component.js";

export class MyCanvas extends Component {
	ctx;
	constructor() {
		super();
	}

	createElement() {
		this.element = document.getElementById("canvas");
		this.ctx = this.element.getContext("2d");
	}

	onRender() {
		this.ctx.strokeRect(0,0,100,100);

		this.ctx.stroke();
	}
}
