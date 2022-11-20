import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Project } from "../project/entity/project.entity";
import { Task } from "../tasks/entity/task.entity";

config();

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	synchronize: false,
	entities: [Project, Task],
	migrations: ["src/migration/*.ts"],
});
