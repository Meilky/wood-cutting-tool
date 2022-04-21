import { Config } from "./config.I";
import { BaseStore } from "~/lib/stores/store";
import config from "~/config";
import { Checker } from "~/lib/utils";

class ConfigStore extends BaseStore<Config> {
	protected checker: Checker;
	constructor() {
		super({
			theme: "assets/themes/default.css",
			login: false,
		});

		this.checker = new Checker({
			"theme": "string",
			"loging": "boolean"
		});

		this.init();
	}

	public async init(): Promise<void> {
		const check = this.checker.check(config)

		if (!check.ok) {
			for (const err of check.errors) {
				console.error(err)
			}
		}

		const link = document.createElement("link");

		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = this.value.theme;

		document.getElementsByTagName("HEAD")[0].appendChild(link);
	}
}

export default new ConfigStore();
