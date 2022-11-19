import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class tasks1668812011483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
			new Table({
				name: "Tasks",
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
                        name: "completed",
                        type: "boolean"
                    },
                    {
                        name: "deadLine",
                        type: "timestamp"
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
        await queryRunner.dropTable('Tasks')
    }

}
