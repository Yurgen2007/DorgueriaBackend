import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorMovimientos1770317908520 implements MigrationInterface {
    name = 'RefactorMovimientos1770317908520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "aceptado"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "en_proceso"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "cancelado"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "devolutivo"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "no_devolutivo"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "fecha_devolucion"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "lugar_destino"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "venta" boolean`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "ingreso" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "ingreso"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP COLUMN IF EXISTS "venta"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "lugar_destino" character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "fecha_devolucion" date`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "no_devolutivo" boolean`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "devolutivo" boolean`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "cancelado" boolean`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "en_proceso" boolean`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" ADD "aceptado" boolean`);
    }

}
