import { PartialConfig } from "./src/stores/config.I";

class config implements PartialConfig {
	public login = true;
}

export default new config();
