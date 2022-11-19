import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class projects1668812008368 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "Projects",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "description",
						type: "text",
					},
					{
						name: "createdAt",
						type: "timestamp",
					},
					{
						name: "updatedAt",
						type: "datetime",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Projects")
    }
}
