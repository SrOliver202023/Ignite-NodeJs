import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1637423630178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "daily_rate",
                        type: "numeric"
                    },
                    {
                        name: "avaliable",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "fine_amount",
                        type: "varchar"
                    },
                    {
                        // FK forekey
                        name: "category_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
                foreignKeys: [
                    {
                        name: "FKCategoryCar",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }
}
