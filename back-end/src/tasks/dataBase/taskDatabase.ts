import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source/data-source";
import { CustonError } from "../../model/custonError";
import { Task } from "../entity/task.entity";

export class TaskDatabase {
	constructor(private appDataSource: DataSource) {}

	async Create(newTask: Task): Promise<Task> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const result = await repository.save(newTask);

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

		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async Delete(id: string) {
		try {
            await this.openConnection();
			
			const repository = this.getProjectRepository();
			await repository.delete({ id });

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
}

export default new TaskDatabase(AppDataSource);
