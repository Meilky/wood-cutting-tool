import { StateLessComponent } from "~/lib/components/state-less-component";

class SubElement extends StateLessComponent {
	constructor(protected props: { id: number }) {
		super({
			element: document.createElement("p")
		})

		this.init()
	}

	public init(): void {
		this.element.innerText = `Hello from sub: ${this.props.id}`
	}
}

class HelloWorldComponent extends StateLessComponent {
	constructor() {
		super({ element: document.createElement("div") });

		this.children = [new SubElement({ id: 0 }), new SubElement({ id: 1 }), new SubElement({ id: 2 })]
		this.init();
	}

	public init(): void {
		this.appenChildren()
	}
}

export const component = new HelloWorldComponent();
