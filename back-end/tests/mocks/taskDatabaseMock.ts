import { DataSource } from "typeorm/data-source/DataSource";
import { Task } from "../../src/tasks/entity/task.entity";
import { dataSourcemock } from "./datasourceMock";
import { task1, task2 } from "./tasksMocks";

class TaskDatabaseMock {
    constructor(private appDataSource: DataSource) {}

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

	async Update(updatedTask: Task, id: string) {}

	async Delete(id: string) {}

	private getProjectRepository() {
		return this.appDataSource.getRepository(Task);
	}

	private async openConnection(): Promise<void> {
		!this.appDataSource.isInitialized && (await this.appDataSource.initialize());
	}
	private async closeConnection(): Promise<void> {
		this.appDataSource.isInitialized && (await this.appDataSource.destroy());
	}
}

export default new TaskDatabaseMock(dataSourcemock)