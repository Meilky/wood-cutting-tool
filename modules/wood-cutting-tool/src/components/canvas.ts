import { StateFullComponent } from "~/lib/components/state-full-component";
import moduleStoreManager,{ ModuleStoreManager } from "~src/store-manager";

export class Canvas extends StateFullComponent<ModuleStoreManager> {
	protected ctx?: CanvasRenderingContext2D;
	protected element: HTMLCanvasElement;

	constructor() {
		super({ element: document.createElement("canvas"), storeManager: moduleStoreManager, binds: ["preferences"] });
		this.element = document.createElement("canvas");

		this.ctx = this.element.getContext("2d") || undefined;
	}

	public beforeUpdate(): void {
		if (this.ctx) {
			this.ctx.clearRect(0, 0, this.element.width, this.element.height);
		}
	}

	public onUpdate(): void {
		if (this.ctx) {
			const centerx = this.element.width / 2;
			const centery = this.element.height / 2;
			const logDiameter = this.stores.preferences.get().diameter;

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
}
