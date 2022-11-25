import { defineStore } from "pinia";

export const useTasksStore = defineStore("task", {
	state: () => ({ tasks: [] }),

	getters: {
		getTasks: (state) => state.tasks,
	},

	actions: {
		setTasks(tasks) {
			this.tasks = tasks;
		},
		addTask(task) {
			this.tasks.push(task);
		},
		editTask(taskEdited) {
			const newTask = this.tasks.map((task) =>
				task.id === taskEdited.id ? taskEdited : task
			);
			console.log(newTask);
		},
		removeTask(id) {
			this.tasks = this.tasks.filter((task) => task.id !== id);
		},
		removeAllTasksByProject(id){
			this.tasks = this.tasks.filter(task => task.projectId !== id)
		}
	},
});
