import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source/data-source";
import { CustonError } from "../../model/custonError";
import { UpdateTaskDto } from "../dto/updatedTaskDto";
import { Task } from "../entity/task.entity";

export class TaskDatabase {
	constructor(private appDataSource: DataSource) {}

	async Create(newTask: Task): Promise<Task> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const result = await repository.save(newTask);

			await this.closeConnection();

			return result;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindAll(): Promise<Task[]> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const tasks = await repository.find();

			await this.closeConnection();

			return tasks;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindOne(id: string) {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const task = await repository.findOne({ where: { id } });

			await this.closeConnection();

			return task;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindByProject(id:string){
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const tasks = await repository.find({where: {projectId:id}});

			await this.closeConnection();

			return tasks;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async Update(updatedTask: Task, id: string) {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			await repository.update(id, updatedTask);

			await this.closeConnection();
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async Delete(id: string) {
		try {
            await this.openConnection();
			
			const repository = this.getProjectRepository();
			await repository.delete({ id });

			await this.closeConnection();
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

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

export default new TaskDatabase(AppDataSource);
