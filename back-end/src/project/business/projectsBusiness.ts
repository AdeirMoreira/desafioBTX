import { validateOrReject } from "class-validator";
import { CustonError } from "../../model/custonError";
import projectsDatabase, { ProjectDatabase } from "../dataBase/projectsDatabase";
import { CreateProjectDto } from "../dto/createProjectDto";
import { Project } from "../entity/project.entity";

export class ProjectsBusiness {
	constructor(private projectData: ProjectDatabase) {}

	async Register(createProjectDto: CreateProjectDto): Promise<Project | undefined> {
		try {
			await validateOrReject(createProjectDto);

			
			const { id,name, description } = createProjectDto;
			const newProject = new Project(
				id,
				name,
				description,
				new Date().toISOString(),
				new Date().toISOString()
			);

			return this.projectData.Create(newProject);
		} catch (error: any) {
			if (Array.isArray(error)) {
				this.FormatValidationErrorMessages(error);
			} else {
				throw new CustonError(error.statusCode, error.message);
			}
		}
	}

	async GetAll(): Promise<Project[]> {
		try {
			let projects = await this.projectData.FindAll();
			projects.map((project) => {
				project.createdAt = this.FormatLocalDate(new Date(project.updatedAt));
				project.updatedAt = this.FormatLocalDate(new Date(project.updatedAt));
			});

			return projects;
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	async GetOne(id: string): Promise<Project> {
		try {
			let project = await this.projectData.FindOne(id);
			if(!project) {
				throw new CustonError(404, "Project not found")
			}

			project.createdAt = this.FormatLocalDate(new Date(project.createdAt));
			project.updatedAt = this.FormatLocalDate(new Date(project.updatedAt));

			console.log(project)
			return project;
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	async Delete(id: string) {
		try {
			const project = await this.projectData.FindOne(id)
			if(!project) {
				throw new CustonError(404, "Project not found")
			}

			await this.projectData.Delete(id);
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	private FormatLocalDate(date: Date) {
		const arrayDate = date.toLocaleString().split(", ");
		return arrayDate[0].replace("-", "/").concat(" ").concat(arrayDate[1]);
	}

	private FormatValidationErrorMessages(error: any) {
		const errorMessages: string[] = [];
		error.map((error: any) => {
			const message: string[] = Object.values(error.constraints);
			errorMessages.push(...message);
		});
		const erroMessagesString = errorMessages.join(" and ") + ".";
		throw new CustonError(422, erroMessagesString);
	}
}

export default new ProjectsBusiness(projectsDatabase);
