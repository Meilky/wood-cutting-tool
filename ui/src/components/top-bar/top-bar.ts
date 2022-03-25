import { StateFullComponent } from "../../lib/components/state-full-component";
import { TopBar as TopBarStyle } from "./style.module.css";
import SizeStore from "../../stores/size";

export class TopBar extends StateFullComponent<{ size: typeof SizeStore }> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				size: SizeStore,
			},
		});

		this.element.className = TopBarStyle;
		this.init();
	}

	public init(): void {
		this.update();
	}

	public onUpdate(): void {
		const size = this.stores.size.value;

		this.element.innerText = "Package App " + size.width.toString() + "," + size.heigth.toString();
	}
}
