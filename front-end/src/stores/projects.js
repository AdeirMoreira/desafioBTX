import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
	state: () => ({ projects: [], projectSelectedId: null }),

	getters: {
		getProjects: (state) => state.projects,
		getProjectSelected: (state) => state.projectSelectedId,
	},

	actions: {
		setAllProjects(prjects) {
			this.projects = prjects;
		},
		addProject(project) {
			this.projects.push(project);
		},
		removeProject(id) {
			this.projects = this.projects.filter((project) => project.id !== id);
		},
        setProjectSelected(id){
            this.projectSelectedId = id
        }
	},
});
