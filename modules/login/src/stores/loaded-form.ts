import { Store } from "~/lib/interfaces/stores/store"
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { PrivateActions } from "~src/interfaces/actions";
import { Forms } from "~src/interfaces/forms";

export class LoadedFormStore implements Store<Forms> {
	public readonly base: Forms;

	protected value: Forms;
	protected listeners: (() => void)[];

	constructor(dispatcher: Dispatcher<PrivateActions>) {
		this.value = Forms.LOGIN;
		this.base = Forms.LOGIN;

		this.listeners = [];

		this.set = this.set.bind(this)

		dispatcher.bind("select_form", this.set);
	}

	public async init(): Promise<void> {
		return;
	}

	public get(): Forms {
		return this.value;
	}

	public set(value: Forms): void {
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
