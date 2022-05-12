import { deepCopy } from "~/lib/utils";
import { UserData } from "~/src/interfaces/user-data";
import { Store } from "~/lib/interfaces/stores/store";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { PrivateActions } from "~/src/interfaces/actions";

export class UserStore implements Store<UserData | undefined> {
	public readonly base: UserData | undefined;

	protected value: UserData | undefined;
	protected listeners: (() => void)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.value = undefined;
		this.base = undefined;
		this.listeners = [];

		this.dispatcher.bind("set_user", this.set)
		this.dispatcher.bind("get_user", this.getUser)
	}

	public async init(): Promise<void> {
		return;
	}

	protected async getUser(): Promise<void> {
		console.log("ok")
		const response = await fetch("/auth/v1/user/info", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			cache: "no-cache",
			credentials: "include",
			body: JSON.stringify({
				fingerprint: sessionStorage.getItem("fingerprint")
			})
		});

		if (response.status !== 200) {
			throw response.text;
		}
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
