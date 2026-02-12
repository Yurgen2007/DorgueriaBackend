import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveColumnasElemento1756341000000 implements MigrationInterface {
    name = 'RemoveColumnasElemento1756341000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Only drop columns if table exists
        const elementosExists = await queryRunner.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'elementos')`);
        
        if (elementosExists[0]?.exists) {
            // Check if columns exist before dropping
            const columns = await queryRunner.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'elementos'`);
            const columnNames = columns.map((c: any) => c.column_name);
            
            if (columnNames.includes('perecedero')) {
                await queryRunner.dropColumn('elementos', 'perecedero');
            }
            if (columnNames.includes('no_perecedero')) {
                await queryRunner.dropColumn('elementos', 'no_perecedero');
            }
            if (columnNames.includes('fecha_vencimiento')) {
                await queryRunner.dropColumn('elementos', 'fecha_vencimiento');
            }
        }
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
