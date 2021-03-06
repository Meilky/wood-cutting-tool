import { Config } from "~/src/interfaces/stores/config";
import { BaseStore } from "~/lib/stores/store";
import config from "~/config";
import { Checker } from "~/lib/utils";

export class ConfigStore extends BaseStore<Config> {
	protected checker: Checker;

	constructor() {
		super({
			theme: "assets/themes/default.css",
			login: false,
		});

		this.checker = new Checker({
			theme: "string",
			loging: "boolean",
		});
	}

	public async init(): Promise<void> {
		const check = this.checker.check(config);

		if (!check.ok) {
			for (const err of check.errors) {
				console.error(err);
			}
		}

		const link = document.createElement("link");

		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = this.value.theme;

		document.getElementsByTagName("HEAD")[0].appendChild(link);
	}
}
