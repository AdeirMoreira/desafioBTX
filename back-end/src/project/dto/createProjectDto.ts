import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}

	@IsNotEmpty({ message: "a name for the project is required" })
	@IsString({ message: "project name must be a string" })
	name: string;

	@IsNotEmpty({ message: "a description for the project is required" })
	@IsString({ message: "project description must be a string" })
	description: string;
}
