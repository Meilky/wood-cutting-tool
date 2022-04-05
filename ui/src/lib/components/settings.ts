import {StateLessComponent} from "./state-less-component"

export class Settings extends StateLessComponent {
	constructor() {
		super({
			element: document.createElement("div")
		})
	}

	public init(): void {
		this.element.innerText = "my settings"
		return
	}
}