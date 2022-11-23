import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "Projects" })
export class Project {
	constructor(id: string, name: string, description: string, createdAt: string, updatedAt: string) {
		this.id = id,
		this.name = name,
		this.description = description,
		this.createdAt = createdAt,
		this.updatedAt = updatedAt;
	}

	@PrimaryColumn({type : "varchar"})
	id: string;

	@Column({ type: "varchar" })
	name: string;

	@Column({ type: "text" })
	description: string;

	@Column({ type: "timestamp" })
	createdAt: string;

	@Column({ type: "datetime" })
	updatedAt: string;
}
