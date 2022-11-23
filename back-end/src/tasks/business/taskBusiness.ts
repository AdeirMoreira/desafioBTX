import { validateOrReject } from "class-validator";
import { CustonError } from "../../model/custonError";
import projectsDatabase, { ProjectDatabase } from "../../project/dataBase/projectsDatabase";
import uuid, { Uuid } from "../../services/Uuid";
import taskDatabase, { TaskDatabase } from "../dataBase/taskDatabase";
import { CreateTaskDto } from "../dto/createTaskDto";
import { UpdateTaskDto } from "../dto/updatedTaskDto";
import { Task } from "../entity/task.entity";

export class TaskBusiness {
	constructor(
		private taskDatabase: TaskDatabase,
		private projectDatabase: ProjectDatabase,
	) {}

	async Register(createTaskDto: CreateTaskDto) {
		try {
			await validateOrReject(createTaskDto);

			const { id, name, description, deadLine, projectId } = createTaskDto;

			await this.FindProject(projectId);

			const completed = false;
			const createdAt = new Date().toISOString();
			const newTask: Task = new Task(
				id,
				name,
				description,
				completed,
				deadLine,
				createdAt,
				createdAt,
				projectId
			);

			return this.taskDatabase.Create(newTask);
		} catch (error: any) {
			if (Array.isArray(error)) {
				this.FormatValidationErrorMessages(error);
			} else {
				throw new CustonError(error.statusCode, error.message);
			}
		}
	}

	async GetAll() {
		try {
			let tasks = await this.taskDatabase.FindAll()
			tasks?.map(task => {
				task.createdAt = this.FormatLocalDate(new Date(task.createdAt))
				task.updatedAt = this.FormatLocalDate(new Date(task.updatedAt))
			})
			return tasks
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	async GetOne(id: string) {
		try {
			let task = await this.taskDatabase.FindOne(id)
			if(!task) {
				throw new CustonError(404, "task not found")
			}

			task.createdAt = this.FormatLocalDate(new Date(task.createdAt))
			task.updatedAt = this.FormatLocalDate(new Date(task.updatedAt))
			return task
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	async GetAllByProject(id: string) {
		try {
			let project = await this.projectDatabase.FindOne(id)
			if(!project) {
				throw new CustonError(404, "project not found")
			}
			
			let tasks = await this.taskDatabase.FindByProject(id)
			tasks?.map(task => {
				task.createdAt = this.FormatLocalDate(new Date(task.createdAt))
				task.updatedAt = this.FormatLocalDate(new Date(task.updatedAt))
			})

			return tasks
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	async Update(updateTaskDto: UpdateTaskDto, id: string) {
		try {
			await validateOrReject(updateTaskDto);

			let task = await this.taskDatabase.FindOne(id)
			if(!task) {
				throw new CustonError(404, "task not found")
			}

			task.name = updateTaskDto.name || task.name
			task.description = updateTaskDto.description || task.description
			task.deadline = updateTaskDto.deadLine || task.deadline 
			task.completed = updateTaskDto.completed || task.completed
			
			task.updatedAt = new Date().toISOString()
			
			await this.taskDatabase.Update(task,id)
		} catch (error:any) {
			if (Array.isArray(error)) {
				this.FormatValidationErrorMessages(error);
			} else {
				throw new CustonError(error.statusCode, error.message);
			}
		}
	}

	async Delete(id: string) {
		try {
			let task = await this.taskDatabase.FindOne(id)

			if(!task) {
				throw new CustonError(404, "task not found")
			}

			await this.taskDatabase.Delete(id)
		} catch (error: any) {
			throw new CustonError(error.statusCode, error.message);
		}
	}

	private async FindProject(id: string) {
		try {
			const project = await this.projectDatabase.FindOne(id);
			if (!project) {
				throw new CustonError(404, "Project not found!");
			}
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

export default new TaskBusiness(taskDatabase, projectsDatabase);
