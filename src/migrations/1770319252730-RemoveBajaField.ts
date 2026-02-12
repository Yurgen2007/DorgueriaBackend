import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBajaField1770319252730 implements MigrationInterface {
    name = 'RemoveBajaField1770319252730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" DROP COLUMN IF EXISTS "baja"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" DROP COLUMN IF EXISTS "baja"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD "baja" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD "baja" boolean NOT NULL DEFAULT false`);
    }

}
