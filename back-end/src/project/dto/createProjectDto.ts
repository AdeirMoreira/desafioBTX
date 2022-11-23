import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
	constructor( id: string, name: string, description: string) {
		this.name = name;
		this.description = description;
		this.id = id
	}

	@IsNotEmpty({ message: "a id for the project is required" })
	@IsString({ message: "project id must be a string" })
	id:string

	@IsNotEmpty({ message: "a name for the project is required" })
	@IsString({ message: "project name must be a string" })
	name: string;

	@IsNotEmpty({ message: "a description for the project is required" })
	@IsString({ message: "project description must be a string" })
	description: string;
}
