import { BaseStore } from "~/lib/stores/store";
import { Project } from "~/src/interfaces/project";
import { Dispatcher } from "~lib/interfaces/dispatcher";
import { ModuleActions } from "~/src/interfaces/actions"

export class ProjectsStore extends BaseStore<Project[]> {
	constructor(protected dispatcher: Dispatcher<ModuleActions>) {
		super([]);

		this.getProjects = this.getProjects.bind(this)

		dispatcher.bind("get_projects", this.getProjects)
	}

	public async init(): Promise<void> {
		return;
	}

	public async getProjects(): Promise<void> {
		const response = await fetch("/api/v1/projects", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			cache: "no-cache",
			credentials: "include",
			body: JSON.stringify({
				fingerprint: sessionStorage.getItem("fingerprint")
			})
		});

		const data = await response.json();

		if (response.status !== 200) {
			throw response.text;
		}
	}
}
