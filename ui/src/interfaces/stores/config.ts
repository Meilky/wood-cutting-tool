import { DeepPartial } from "~/lib/utils";

export interface Config {
	theme: string;
	login: boolean;
}

export type PartialConfig = DeepPartial<Config>;
