import { StateFullComponent } from "../lib/state-full-component.js";
import PreferencesStore from "../stores/preferences.js";

export class MyCanvas extends StateFullComponent {
	ctx;
	constructor() {
		super({ stores: { preferences: PreferencesStore } });
	}

	createElement() {
		this.element = document.getElementById("canvas");
		this.ctx = this.element.getContext("2d");
	}

	beforeRender() {
		this.element.width = this.element.offsetWidth;
		this.element.height = this.element.offsetHeight;
		this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	}

	onRender() {
		const centerx = this.element.width / 2;
		const centery = this.element.height / 2;

		let radius = centerx;

		if (centerx > centery) {
			radius = centery;
		}

		this.ctx.beginPath();
		this.ctx.arc(centerx, centery, radius, 0, 2 * Math.PI);
		this.ctx.moveTo(0,centery);
		this.ctx.lineTo(centerx*2,centery)
		this.ctx.stroke();
	}
}
