import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
	state: () => ({ projects: [], projectSelectedId: null, deletedProjectId: null }),

	getters: {
		getProjects: (state) => state.projects,
		getProjectSelected: (state) => state.projectSelectedId,
		getProjectSelected: (state) => state.deletedProjectId,
	},

	actions: {
		setAllProjects(prjects) {
			this.projects = prjects;
			this.sortProjects();
		},
		addProject(project) {
			this.projects.push(project);
		},
		removeProject(id) {
			this.projects = this.projects.filter((project) => project.id !== id);
			this.setDeletedProjectId(id);
			this.sortProjects();
		},
		setProjectSelected(id) {
			this.projectSelectedId = id;
		},
		setDeletedProjectId(id) {
			this.deletedProjectId = id;
		},
		sortProjects() {
			this.projects = this.projects.sort((a, b) => {
				const atime = new Date(
					`${a.createdAt.split(" ")[0].split("/").reverse().join("/")} ${
						a.createdAt.split(" ")[1]
					}`
				).getTime();
				const btime = new Date(
					`${b.createdAt.split(" ")[0].split("/").reverse().join("/")} ${
						b.createdAt.split(" ")[1]
					}`
				).getTime();
				return atime - btime;
			});
		},
	},
});
