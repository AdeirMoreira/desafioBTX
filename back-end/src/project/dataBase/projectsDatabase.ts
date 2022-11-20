import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source/data-source";
import { CustonError } from "../../model/custonError";
import { Project } from "../entity/project.entity";

export class ProjectDatabase {
	constructor(private appDataSource: DataSource) {}

	async Create(newProject: Project): Promise<Project> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const result = await repository.save(newProject);

			await this.closeConnection();

			return result;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindAll() {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const projects = await repository.find();

			await this.closeConnection();

			return projects;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindOne(id: string): Promise<Project> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const project = await repository.findOne({ where: { id } });

			await this.closeConnection();

			if (!project) {
				throw new CustonError(404, "Project not Found");
			}

			return project;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async Delete(id: string) {
		await this.FindOne(id);

		try {
			await this.openConnection();
			
			const repository = this.getProjectRepository();
			const reponse = await repository.delete({ id });

			await this.closeConnection();

			return reponse;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	private getProjectRepository() {
		return this.appDataSource.getRepository(Project);
	}

	private async openConnection(): Promise<void> {
		!this.appDataSource.isInitialized && (await this.appDataSource.initialize());
	}
	private async closeConnection(): Promise<void> {
		this.appDataSource.isInitialized && (await this.appDataSource.destroy());
	}
}

export default new ProjectDatabase(AppDataSource);
