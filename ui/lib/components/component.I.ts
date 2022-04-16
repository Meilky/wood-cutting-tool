import { DeepPartial } from "../utils";

export interface Component {
	readonly propreties: Propreties;

	get(): HTMLElement;
	update(): void;
	removeChildren(): void;
}

export interface Propreties {
	element: HTMLElement;
	render: {
		mobile: boolean;
		desktop: boolean;
	};
}

export interface Props {
	element: HTMLElement;
	render?: DeepPartial<Propreties["render"]>;
}

export interface DefaultProps {
	render: Propreties["render"];
}
