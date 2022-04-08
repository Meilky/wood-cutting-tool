import { StateFullComponent } from "~/lib/components/state-full-component";
import PreferencesStore from "~/src/stores/preferences";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { Preference } from "~/src/interfaces/preference";

export class Preferences extends StateFullComponent<{ preferences: typeof PreferencesStore }> {
	constructor() {
		super({ element: document.createElement("form"), stores: { preferences: PreferencesStore } });

		this.onSubmit = this.onSubmit.bind(this);

		this.init();
	}

	public init(): void {
		this.element.addEventListener("submit", this.onSubmit);
		this.children = [new UnitInput(), new DiameterInput(), new Submit()];
		this.appenChildren();
	}

	public onUpdate(): void {
		return;
	}

	protected onSubmit(e: any): void {
		e.preventDefault();

		const form = new FormData(e.target);

		const newData: Preference = {
			unit: String(form.get("unit")) == "in" ? "in" : "cm",
			diameter: Number(form.get("diameter")),
		};

		this.stores.preferences.value = newData;
	}
}

class UnitInput extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("div") });
	}

	public init(): void {
		const lb = document.createElement("label");
		lb.innerText = "Unit :";
		const select = document.createElement("select");
		select.name = "unit";
		const opt1 = document.createElement("option");
		opt1.innerText = "cm";
		opt1.value = "cm";
		const opt2 = document.createElement("option");
		opt2.innerText = "in";
		opt2.value = "in";

		select.append(opt1);
		select.append(opt2);

		this.element.append(lb);
		this.element.append(select);
	}
}

class DiameterInput extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("div") });
	}

	public init(): void {
		const lb = document.createElement("label");
		lb.innerText = "Diameter :";
		const input = document.createElement("select");
		input.name = "diameter";

		this.element.append(lb);
		this.element.append(input);
	}
}

class Submit extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("button") });
	}

	public init(): void {
		this.element.innerText = "submit";
	}
}
