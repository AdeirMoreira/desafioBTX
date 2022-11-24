import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source/data-source";
import { CustonError } from "../../model/custonError";
import { Task } from "../entity/task.entity";

export class TaskDatabase {
	constructor(private appDataSource: DataSource) {}

	async Create(newTask: Task): Promise<Task> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const response = await repository.save(newTask);

			return this.assignTask(response)
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindAll(): Promise<Task[]> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const response = await repository.find();

			return response.map(task => this.assignTask(task))
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindOne(id: string):Promise<Task | null> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			let response = await repository.findOne({ where: { id } });
			if(response) {
				return this.assignTask(response)
			} else {
				return response
			}
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindByProject(id: string):Promise<Task[]> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const response = await repository.find({ where: { projectId: id } });

			return response.map(task => this.assignTask(task))
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async Update(updatedTask: Task, id: string):Promise<void> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			await repository.update(id, updatedTask);
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async Delete(id: string):Promise<void> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			await repository.delete({ id });
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	private assignTask(task: Task):Task{
		return new Task(
			task.id,
			task.name,
			task.description,
			task.completed,
			task.deadLine,
			task.createdAt,
			task.updatedAt,
			task.projectId as string
		);
	}

	private getProjectRepository():Repository<Task> {
		return this.appDataSource.getRepository(Task);
	}

	private async openConnection(): Promise<void> {
		!this.appDataSource.isInitialized && (await this.appDataSource.initialize());
	}
}

export default new TaskDatabase(AppDataSource);
