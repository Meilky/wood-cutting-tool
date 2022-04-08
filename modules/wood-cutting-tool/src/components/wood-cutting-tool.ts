import { StateLessComponent } from "~/lib/components/state-less-component";
import { PlankTypes } from "./plank-types";
import { Preferences } from "./preferences";
import { Canvas } from "./canvas";

export class WoodCuttingTool extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("div") });

		this.init()
	}

	public init(): void {
		this.children = [new Preferences(), new Canvas(), new PlankTypes()];
		this.appenChildren()
	}
}
