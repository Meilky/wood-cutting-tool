import { deepCopy } from "~/lib/utils";
import { UserData } from "~/src/interfaces/user-data";
import { Store } from "~/lib/interfaces/stores/store";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { PrivateActions } from "~/src/interfaces/actions";

export class UserStore implements Store<UserData | undefined> {
	public readonly defaults: UserData | undefined;

	protected value: UserData | undefined;
	protected listeners: (() => void)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.value = undefined;
		this.defaults = undefined;
		this.listeners = [];

		this.dispatcher.bind("login", this.set);
	}

	public async init(): Promise<void> {
		return;
	}

	public get(): UserData | undefined {
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
