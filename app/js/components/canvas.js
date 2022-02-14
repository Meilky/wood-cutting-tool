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
		this.ctx.font = "20px Georgia";
	}

	beforeRender() {
		this.ctx.clearRect(0,0,this.element.width,this.element.height);
	}

	onRender() {
		this.ctx.strokeText(this.stores.preferences.value.unit, 10, 50);
		this.ctx.strokeText(this.stores.preferences.value.diameter, 100, 50);
		this.ctx.stroke();
	}
}
