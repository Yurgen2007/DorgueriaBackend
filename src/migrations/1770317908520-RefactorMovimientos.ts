import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorMovimientos1770317908520 implements MigrationInterface {
    name = 'RefactorMovimientos1770317908520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "aceptado"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "en_proceso"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "cancelado"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "devolutivo"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "no_devolutivo"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "fecha_devolucion"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "lugar_destino"`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "venta" boolean`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "ingreso" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "ingreso"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP COLUMN "venta"`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "lugar_destino" character varying`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "fecha_devolucion" date`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "no_devolutivo" boolean`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "devolutivo" boolean`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "cancelado" boolean`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "en_proceso" boolean`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD "aceptado" boolean`);
    }

}
