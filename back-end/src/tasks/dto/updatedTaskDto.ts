import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
	constructor(name: string, description: string, deadLine: string, completed: boolean) {
		this.name = name;
		this.description = description;
		this.deadLine = deadLine;
		this.completed = completed;
	}

	@IsOptional()
	@IsString({ message: "task name must be a string" })
	name: string;

	@IsOptional()
	@IsString({ message: "task description must be a string" })
	description: string;

	@IsOptional()
	@IsString({ message: "task deadLine must be a string" })
	deadLine: string;

	@IsOptional()
	@IsBoolean({ message: "task completed must be a boolean" })
	completed: boolean;
}
