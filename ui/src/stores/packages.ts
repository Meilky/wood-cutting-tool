import { Package } from "./stores.I";
import { BaseStore } from "../lib/stores/store";

class PackagesStore extends BaseStore<Package[]> {
	constructor() {
		super([{ name: "Settings", description: "Your settings" }]);
	}

	public async init(): Promise<void> {
		const res = await fetch("/api/");
		const packages = await res.json();

		this.value = packages;
	}
}

const s = new PackagesStore();
s.init();

export default s;
