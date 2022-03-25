import { Size } from "./stores.I";
import { BaseStore } from "../lib/stores/store";

class SizeStore extends BaseStore<Size> {
	constructor() {
		super({
			width: window.innerWidth,
			heigth: window.innerHeight,
		});
	}

	public init(): void {}
}

export default new SizeStore();
