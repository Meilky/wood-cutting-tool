import { Props } from "./component.I";
import {StoreManager} from "~/lib/interfaces/store-manager"

export interface StateFullPropreties<T extends StoreManager<any>> extends Props {
	storeManager: T["stores"],
	binds: (keyof T["stores"])[]
}
