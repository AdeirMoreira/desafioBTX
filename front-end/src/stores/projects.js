import { defineStore } from 'pinia'

export const useProjectStore = defineStore("project", {
	state: () => ({ projects: [
        // {
        //     id:'1',
        //     name: 'project1'
        // },
        // {
        //     id:'2',
        //     name: 'project2'
        // },
        // {
        //     id:'3',
        //     name: 'project3'
        // },
        // {
        //     id:'4',
        //     name: 'project4'
        // },
        // {
        //     id:'5',
        //     name: 'project5'
        // },
        // {
        //     id:'6',
        //     name: 'project6'
        // }
    ] }),

	getters: {
		getProjects: (state) => state.projects 
	},

	actions: {
		addProject(project) {
			this.projects.push(project)
		},
        removeProject(id) {
            console.log(id)
            this.projects = this.projects.filter(project => project.id !== id)
        }
	},
});
