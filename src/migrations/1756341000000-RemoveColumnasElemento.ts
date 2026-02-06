import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveColumnasElemento1756341000000 implements MigrationInterface {
    name = 'RemoveColumnasElemento1756341000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('elementos', 'perecedero');
        await queryRunner.dropColumn('elementos', 'no_perecedero');
        await queryRunner.dropColumn('elementos', 'fecha_vencimiento');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('elementos', new TableColumn({
            name: 'perecedero',
            type: 'boolean',
            isNullable: true
        }));
        await queryRunner.addColumn('elementos', new TableColumn({
            name: 'no_perecedero',
            type: 'boolean',
            isNullable: true
        }));
        await queryRunner.addColumn('elementos', new TableColumn({
            name: 'fecha_vencimiento',
            type: 'date',
            isNullable: true
        }));
    }
}
