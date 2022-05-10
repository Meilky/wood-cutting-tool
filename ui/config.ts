import { PartialConfig } from "./src/interfaces/stores/config";

class config implements PartialConfig {
	public login = true;
	public defaultRepo = "/api/v1/modules";
}

export default new config();
