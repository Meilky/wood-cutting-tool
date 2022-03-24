import { StateFullComponent } from "../lib/state-full-component.js";
import PreferencesStore from "../stores/preferences.js";

export class MyCanvas extends StateFullComponent {
	ctx;

	constructor() {
		super({ stores: { preferences: PreferencesStore } });
	}

	start() {
		this.element = document.getElementById("canvas");
		this.ctx = this.element.getContext("2d");
		this.update();
	}

	beforeUpdate() {
		this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	}

	onUpdate() {
		const centerx = this.element.width / 2;
		const centery = this.element.height / 2;
		const logDiameter = this.stores.preferences.value.diameter;

		let radius = centerx;
		let space = (radius * 2) / logDiameter;

		if (centerx > centery) {
			radius = centery;
			space = (radius * 2) / logDiameter;
		}

		this.ctx.beginPath();
		this.ctx.arc(centerx, centery, radius, 0, 2 * Math.PI);
		this.ctx.moveTo(centerx - radius, centery);
		this.ctx.lineTo(centerx + radius, centery);

		for (let i = 0; i <= logDiameter; i++) {
			this.ctx.moveTo(0, centery - radius + space * i);
			this.ctx.lineTo(centerx * 2, centery - radius + space * i);

			this.ctx.moveTo(centerx + radius - space * i, 0);
			this.ctx.lineTo(centerx + radius - space * i, centery * 2);
		}

		this.ctx.stroke();
	}
}
