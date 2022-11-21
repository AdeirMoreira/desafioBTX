import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
	constructor(name: string, description: string, deadLine: string, projectId: string) {
		this.name = name, 
        this.description = description, 
        this.deadLine = deadLine;
		this.projectId = projectId
	}

    @IsNotEmpty({ message: "a name for the task is required" })
	@IsString({ message: "task name must be a string" })
	name: string;

    @IsNotEmpty({ message: "a description for the task is required" })
	@IsString({ message: "task description must be a string" })
	description: string;

    @IsNotEmpty({ message: "a deadline for the task is required" })
	@IsString({ message: "task deadline must be a string" })
	deadLine: string;

	@IsNotEmpty({ message: "the id of the project to which the task belongs is required" })
	@IsString({ message: "the id of the project the task belongs to must be a string" })
	projectId: string;
}
