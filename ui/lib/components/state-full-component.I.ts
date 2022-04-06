import { Store } from "stores/store";
import { Props } from "./component.I";

export interface StateFullPropreties<T extends { [key: string]: Store<any> }> extends Props {
	stores: T;
}
