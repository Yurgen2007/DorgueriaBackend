import { MigrationInterface, QueryRunner } from "typeorm";

export class DropSimboloCaracteristicas1706210000000 implements MigrationInterface {
    name = 'DropSimboloCaracteristicas1706210000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "caracteristicas" DROP COLUMN IF EXISTS "simbolo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "caracteristicas" ADD COLUMN IF NOT EXISTS "simbolo" character varying(50)`);
    }
}
