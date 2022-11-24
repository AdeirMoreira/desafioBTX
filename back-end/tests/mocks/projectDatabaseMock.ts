import { Project } from "../../src/project/entity/project.entity";
import { project1, project2 } from "./projectsMocks";

class ProjectDatabaseMock {

	async Create(newProject: Project): Promise<Project> {
		return newProject
	}

	async FindAll():Promise<Project[]> {
		return [project1, project2]
	}

	async FindOne(id: string): Promise<Project | null> {
		if(id === "id1" || id === 'id5') {
			return project1
		} else {
			return null
		}
	}

	async Delete(id: string) {}
}

export default new ProjectDatabaseMock();


