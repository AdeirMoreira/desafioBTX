import { defineStore } from 'pinia'

export const useTasksStore = defineStore("task", {
	state: () => ({ tasks: [
        // {
        //     id:'1',
        //     name: 'task1',
        //     description:'aksdf asdalsd ksadkn  aksdnas',
        //     deadline:'22/11/2022',
        //     completed: true
        // },
        // {
        //     id:'2',
        //     name: 'task2',
        //     description:'aksdf asdalsd ksadkn  aksdnas',
        //     deadline:'23/11/2022',
        //     completed: false
        // },
        // {
        //     id:'3',
        //     name: 'task3',
        //     description:'aksdf asdalsd ksadkn  aksdnas',
        //     deadline:'24/11/2022',
        //     completed: true
        // },
        // {
        //     id:'4',
        //     name: 'task4',
        //     description:'aksdf asdalsd ksadkn  aksdnas',
        //     deadline:'25/11/2022',
        //     completed: false
        // },
        
    ] }),

	getters: {
		getTasks: (state) => state.tasks
	},

	actions: {
		addTask(task) {
			this.tasks.push(task)
		},
        editTask(taskEdited){
            
            const newTask = this.tasks.map(task => task.id === taskEdited.id ? taskEdited: task)
            console.log(newTask)
        },
        removeTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
        }
	},
});