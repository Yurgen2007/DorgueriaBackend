import { MigrationInterface, QueryRunner } from "typeorm";

export class DropMovimientosTables1770411000000 implements MigrationInterface {
    name = 'DropMovimientosTables1770411000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Eliminar constraints FK de lotes primero
        await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT IF EXISTS "FK_a69cba4795d6f8deaf1e31a3a54"`);
        await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT IF EXISTS "FK_917eb9257ccac2cbba93dc34424"`);
        
        // Eliminar tablas
        await queryRunner.query(`DROP TABLE IF EXISTS "movimientos" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "tipo_movimientos" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "lotes" CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // No es necesario recrear las tablas ya que fueron eliminadas del código
    }
}
