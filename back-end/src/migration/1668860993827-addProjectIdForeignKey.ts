import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class addProjectIdForeignKey1668860993827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "Tasks",
            new TableColumn({
                name: "projectId",
                type: "varchar"
            })
        )

        await queryRunner.createForeignKey(
            "Tasks",
            new TableForeignKey({
                name: "projectIdFK",
                columnNames: ["projectId"],
                referencedColumnNames: ["id"],
                referencedTableName: "Projects",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("Tasks", "projectIdFK")
        await queryRunner.dropColumn("Tasks", "projectId")
    }

}
