import { deepCopy } from "~/lib/utils";
import { LoginData, SignupData, UserData } from "~/src/interfaces/user-data";
import { Store } from "~/lib/interfaces/stores/store";
import { Dispatcher } from "~/lib/interfaces/dispatcher";
import { PrivateActions } from "~/src/interfaces/actions";

export class UserStore implements Store<UserData | undefined> {
	public readonly default: UserData | undefined;

	protected value: UserData | undefined;
	protected listeners: (() => void)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		this.value = undefined;
		this.default = undefined;
		this.listeners = [];

		this.dispatcher.bind("login", this.login);
		this.dispatcher.bind("signup", this.signup);
	}

	public async init(): Promise<void> {
		return;
	}

	protected async login(value: LoginData): Promise<void> {
		try {
			const response = await fetch("/auth/v1/user/login", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				cache: "no-cache",
				body: JSON.stringify({
					username_or_email: value.usernameOrEmail,
					password: value.password
				})
			});

			if (response.status !== 200) {
				return;
			}

			const result = await response.json();

			console.log(result);
		}
		catch (e: any) {
			console.error(e)
		}
	}

	protected async signup(value: SignupData): Promise<void> {
		try {
			const response = await fetch("auth/v1/user/create", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(value)
			});

			if (response.status !== 200) {
				return;
			}

			const result = await response.json();

			console.log(result);
		}
		catch (e: any) {
			console.error(e)
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
