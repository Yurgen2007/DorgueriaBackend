import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1770410825679 implements MigrationInterface {
    name = 'Migrations1770410825679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" DROP CONSTRAINT IF EXISTS "FK_740d091fe48f0f2ed53ca6e7d30"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" DROP COLUMN IF EXISTS "fk_movimiento"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "caracteristicas" DROP COLUMN IF EXISTS "simbolo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD "fk_movimiento" integer`);
        await queryRunner.query(`ALTER TABLE "caracteristicas" ADD "simbolo" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_740d091fe48f0f2ed53ca6e7d30" FOREIGN KEY ("fk_movimiento") REFERENCES "movimientos"("id_movimiento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
