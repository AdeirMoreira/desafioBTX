import { Task } from "../../src/tasks/entity/task.entity";
import { task1, task2, task3 } from "./tasksMocks";

class TaskDatabaseMock {
	async Create(newTask: Task): Promise<Task> {
		return task1
	}

	async FindAll(): Promise<Task[] | undefined> {
		return [task1, task2]
	}

	async FindOne(id: string): Promise<Task | undefined> {
		if(id === "id2") {
			return task2
		}
	}

	async FindByProject(id: string):Promise<Task[]> {
		if(id=== 'id5'){
			return [task2,task3]
		} else {
			return []
		}
	}

	async Update(updatedTask: Task, id: string) {}

	async Delete(id: string) {}
}

export default new TaskDatabaseMock()