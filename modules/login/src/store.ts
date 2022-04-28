import { deepCopy } from "~/lib/utils";
import { UserData } from "./interfaces/user-data";
import { Store } from "~/lib/interfaces/stores/store";
import { Dispatcher } from "./interfaces/dispatcher";
import { UserActions } from "./interfaces/actions";
import userDispatcher from "./dispatcher";

export class UserStore implements Store<Partial<UserData>, UserData> {
	public readonly defaults: Partial<UserData>;

	protected value: Partial<UserData>;
	protected listeners: (() => void)[];

	constructor(protected dispatcher: Dispatcher<UserActions>) {
		this.value = {};
		this.defaults = {};
		this.listeners = [];

		this.dispatcher.bind({
			login: this.login,
		});
	}

	protected login(value: UserData): void {
		console.log(value);
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

export default new UserStore(userDispatcher);
