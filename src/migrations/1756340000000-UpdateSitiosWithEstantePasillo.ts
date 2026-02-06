import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSitiosWithEstantePasillo1756340000000 implements MigrationInterface {
    name = 'UpdateSitiosWithEstantePasillo1756340000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Agregar campos a la tabla sitios
        await queryRunner.query(`ALTER TABLE sitios ADD COLUMN IF NOT EXISTS estante VARCHAR(20)`);
        await queryRunner.query(`ALTER TABLE sitios ADD COLUMN IF NOT EXISTS pasillo VARCHAR(20)`);
        await queryRunner.query(`ALTER TABLE sitios ADD COLUMN IF NOT EXISTS nivel VARCHAR(20)`);
        
        // Actualizar elementos para incluir campos perecedero, noPerecedero, fechaVencimiento si no existen
        await queryRunner.query(`ALTER TABLE elementos ADD COLUMN IF NOT EXISTS perecedero BOOLEAN DEFAULT false`);
        await queryRunner.query(`ALTER TABLE elementos ADD COLUMN IF NOT EXISTS no_perecedero BOOLEAN DEFAULT false`);
        await queryRunner.query(`ALTER TABLE elementos ADD COLUMN IF NOT EXISTS fecha_vencimiento DATE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE sitios DROP COLUMN IF EXISTS estante`);
        await queryRunner.query(`ALTER TABLE sitios DROP COLUMN IF EXISTS pasillo`);
        await queryRunner.query(`ALTER TABLE sitios DROP COLUMN IF EXISTS nivel`);
        await queryRunner.query(`ALTER TABLE elementos DROP COLUMN IF EXISTS perecedero`);
        await queryRunner.query(`ALTER TABLE elementos DROP COLUMN IF EXISTS no_perecedero`);
        await queryRunner.query(`ALTER TABLE elementos DROP COLUMN IF EXISTS fecha_vencimiento`);
    }
}
