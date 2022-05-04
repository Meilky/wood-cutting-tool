import { deepCopy } from "~/lib/utils";
import { UserData } from "~/src/interfaces/user-data";
import { Store } from "~/lib/interfaces/stores/store";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { PrivateActions } from "~/src/interfaces/actions";

export class UserStore implements Store<Partial<UserData>, UserData> {
	public readonly defaults: Partial<UserData>;

	protected value: Partial<UserData>;
	protected listeners: (() => void)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.value = {};
		this.defaults = {};
		this.listeners = [];

		this.dispatcher.bind("login", this.set);
	}

	public async init(): Promise<void> {
		return;
	}

	public get(): Partial<UserData> {
		return this.value;
	}

	public set(value: UserData): void {
		this.value = Object.freeze(deepCopy(value));
	}

	public emmitChange(): void {
		for (const callback of this.listeners) {
			callback();
		}
	}

	public bind(callback: () => void): void {
		this.listeners.push(callback);
	}

	public unbind(callback: () => void): void {
		const index = this.listeners.indexOf(callback);

		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}
}
