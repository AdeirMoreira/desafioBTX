import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source/data-source";
import { CustonError } from "../../model/custonError";
import { Project } from "../entity/project.entity";

export class ProjectDatabase {
	constructor(private appDataSource: DataSource) {}

	async Create(newProject: Project): Promise<Project> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const response = await repository.save(newProject);

			return this.assignProject(response)
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindAll():Promise<Project[]> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const response = await repository.find();

			return response.map(project => this.assignProject(project))
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindOne(id: string): Promise<Project | null> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const response = await repository.findOne({ where: { id } });

			if(response) {
				return this.assignProject(response)
			} else {
				return response
			}
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

	private assignProject(task: Project):Project{
		return new Project(
			task.id,
			task.name,
			task.description,
			task.createdAt,
			task.updatedAt,
		);
	}

	private getProjectRepository():Repository<Project> {
		return this.appDataSource.getRepository(Project);
	}

	private async openConnection(): Promise<void> {
		!this.appDataSource.isInitialized && (await this.appDataSource.initialize());
	}
}

export default new ProjectDatabase(AppDataSource);
