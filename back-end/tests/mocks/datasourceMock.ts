import { DataSource } from "typeorm/data-source/DataSource";

export const dataSourcemock = new DataSource({
    type: "mysql",
	host: 'host',
	port: 0,
	username: 'username',
	password: 'password',
	database: 'datagase',
	synchronize: false,
	entities: [],
	migrations: [],
})