import { Config } from "./config.I"
import { BaseStore } from "./store"
import config from "../../../config"

class ConfigStore extends BaseStore<Config> {
	constructor() {
		super({
			theme: "default.css"
		})

		this.init()
	}

	public init(): void {
		this.value = config

		const link = document.createElement('link');

		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = this.value.theme;

		document.getElementsByTagName('HEAD')[0].appendChild(link);
	}
}

export default new ConfigStore();
