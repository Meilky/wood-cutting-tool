import { Store } from "~/lib/interfaces/stores/store"
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "~src/interfaces/actions";
import { Login, LoginStates } from "~src/interfaces/login";
import { LoginData } from "~src/interfaces/user-data";

export class LoginStore implements Store<Login> {
	public readonly base: Login;

	protected value: Login;
	protected listeners: (() => void)[];

	constructor(protected dispatcher: Dispatcher<PrivateActions>) {
		const base: Login = {
			state: LoginStates.NA,
		}

		this.value = base;
		this.base = base;

		this.listeners = [];

		this.set = this.set.bind(this)
		this.login = this.login.bind(this)

		dispatcher.bind("login", this.login);
	}

	public async init(): Promise<void> {
		return;
	}

	protected async login(value: LoginData): Promise<void> {
		this.set({
			state: LoginStates.LOADING,
			msg: "Loading ..."
		})

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
				throw response.text;
			}

			const result = await response.json();

			if (!result.fingerprint) {
				throw "No fingerprint returned from the server";
			}

			sessionStorage.setItem("fingerprint", result.fingerprint)

			this.dispatcher.dispatch("get_user", undefined);
		}
		catch (e: any) {
			this.set({
				state: LoginStates.ERROR,
				msg: e
			})
		}

		this.set({
			state: LoginStates.SUCCESS,
			msg: "Successfuly created your account!"
		})
	}

	public get(): Login {
		return this.value;
	}

	public set(value: Login): void {
		this.value = Object.freeze(value);

		this.emmitChange()
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
