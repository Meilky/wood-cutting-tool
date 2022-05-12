import { Store } from "~/lib/interfaces/stores/store"
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "~src/interfaces/actions";
import { Signup, SignupStates } from "~src/interfaces/signup";
import { SignupData } from "~src/interfaces/user-data";

export class SignupStore implements Store<Signup> {
	public readonly base: Signup;

	protected value: Signup;
	protected listeners: (() => void)[];

	constructor(dispatcher: Dispatcher<PrivateActions>) {
		const base: Signup = {
			state: SignupStates.NA,
		}

		this.value = base;
		this.base = base;

		this.listeners = [];

		this.set = this.set.bind(this)
		this.signup = this.signup.bind(this)

		dispatcher.bind("signup", this.signup);
	}

	public async init(): Promise<void> {
		return;
	}

	protected async signup(value: SignupData): Promise<void> {
		this.set({
			state: SignupStates.LOADING,
			msg: "Loading ..."
		})

		try {
			const response = await fetch("auth/v1/user/create", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(value)
			});

			if (response.status !== 200) {
				throw await response.text();
			}

			this.set({
				state: SignupStates.SUCCESS,
				msg: "Successfuly created your account!"
			})
		}
		catch (e: any) {
			this.set({
				state: SignupStates.ERROR,
				msg: e
			})
		}
	}

	public get(): Signup {
		return this.value;
	}

	public set(value: Signup): void {
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
