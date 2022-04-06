import { StateFullComponent } from "~/lib/components/state-full-component";
import ModulesStore from "~/src/stores/modules";
import { Module } from "~/src/interfaces/modules/module";
import { StateLessComponent } from "~/lib/components/state-less-component";
import { NavBar as NavBarStyle, NavBarItem as NavBarItemStyle } from "./style.module.css";
import LoadedModuleStore from "~/src/stores/loaded-module";

export class NavBar extends StateFullComponent<{
	modules: typeof ModulesStore;
	loadedModule: typeof LoadedModuleStore;
}> {
	constructor() {
		super({
			element: document.createElement("div"),
			stores: {
				modules: ModulesStore,
				loadedModule: LoadedModuleStore,
			},
		});

		this.init();
	}

	public init(): void {
		this.element.className = NavBarStyle;

		this.update();
	}

	protected beforeUpdate(): void {
		this.children = [];
	}

	public onUpdate(): void {
		const modules = this.stores.modules.value;
		const loadedMod = this.stores.loadedModule.value;

		for (const mod of modules) {
			let isLoaded = false;

			if (mod.id == loadedMod.id) {
				isLoaded = true;
			}

			this.children.push(new NavBarItem({ module: mod, isLoaded, loadedModule: this.stores.loadedModule }));
		}
	}
}

interface NavBarItemProps {
	module: Module;
	isLoaded?: boolean;
	loadedModule: typeof LoadedModuleStore;
}

class NavBarItem extends StateLessComponent {
	constructor(protected props: NavBarItemProps) {
		super({
			element: document.createElement("div"),
		});

		this.onClick = this.onClick.bind(this);
		this.init();
	}

	public init(): void {
		const html = `<span><p>${this.props.module.name}</p></span>`;

		this.element.className = NavBarItemStyle;
		this.element.onclick = this.onClick;
		this.element.style.color = "var(--th-light)";

		if (this.props.isLoaded) {
			this.element.style.backgroundColor = "var(--th-gray-700)";
		}

		if (this.props.module.error) {
			switch (this.props.module.error.state) {
				case "error":
					this.element.style.color = "var(--th-danger)";
					break;
				case "warning":
					this.element.style.color = "var(--th-warning)";
					break;
			}
		}

		this.element.innerHTML = html;
	}

	protected onClick(): void {
		this.props.loadedModule.value = this.props.module;
	}
}
