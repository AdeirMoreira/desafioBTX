import { DataSource } from "typeorm";
import { Project } from "../../src/project/entity/project.entity";
import { dataSourcemock } from "./datasourceMock";
import { project1, project2 } from "./projectsMocks";

class ProjectDatabaseMock {
	constructor(private appDataSource: DataSource) {}

	async Create(newProject: Project): Promise<Project> {
		return newProject
	}

	async FindAll():Promise<Project[]> {
		return [project1, project2]
	}

	async FindOne(id: string): Promise<Project | null> {
		if(id === "id1") {
			return project1
		} else {
			return null
		}
	}

	async Delete(id: string) {}

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

export default new ProjectDatabaseMock(dataSourcemock);


