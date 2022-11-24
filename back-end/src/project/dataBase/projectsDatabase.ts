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


			return projects;
		} catch (error: any) {
			throw new CustonError(error.statusCode || 500, error.sqlMessage || error.message);
		}
	}

	async FindOne(id: string): Promise<Project | null> {
		try {
			await this.openConnection();

			const repository = this.getProjectRepository();
			const project = await repository.findOne({ where: { id } });

			return project;
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
		return this.appDataSource.getRepository(Project);
	}

	private async openConnection(): Promise<void> {
		!this.appDataSource.isInitialized && (await this.appDataSource.initialize());
	}
}

export default new ProjectDatabase(AppDataSource);
