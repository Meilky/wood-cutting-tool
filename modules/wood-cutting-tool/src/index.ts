import { WoodCuttingTool } from "./components/wood-cutting-tool";

export const init = async (): Promise<any> => {
	return {
		css: "/modules/wood-cutting-tool/index.css",
		component: new WoodCuttingTool(),
	}
}
