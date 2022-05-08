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
		console.log(value)
		return;
	}

	protected async signup(value: SignupData): Promise<void> {
		console.log(value)
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
