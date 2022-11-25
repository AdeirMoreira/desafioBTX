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
		},
		addProject(project) {
			this.projects.push(project);
		},
		removeProject(id) {
			this.projects = this.projects.filter((project) => project.id !== id);
			this.setDeletedProjectId(id)
		},
        setProjectSelected(id){
            this.projectSelectedId = id
        },
		setDeletedProjectId(id){
            this.deletedProjectId = id
        }
	},
});
