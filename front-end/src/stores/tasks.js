import { defineStore } from "pinia";

export const useTasksStore = defineStore("task", {
	state: () => ({ tasks: [] }),

	getters: {
		getTasks: (state) => state.tasks,
	},

	actions: {
		setTasks(tasks) {
			this.tasks = tasks;
			this.sortTasks()
		},
		addTask(task) {
			this.tasks.push(task);
			this.sortTasks()
		},
		removeTask(id) {
			this.tasks = this.tasks.filter((task) => task.id !== id);
			this.sortTasks()
		},
		removeAllTasksByProject(id){
			this.tasks = this.tasks.filter(task => task.projectId !== id)
		},
		sortTasks(){
			this.tasks = this.tasks.sort((a,b) => {
				return new Date(a.deadLine).getTime() - new Date(b.deadLine)
			})
		}
	},
});
