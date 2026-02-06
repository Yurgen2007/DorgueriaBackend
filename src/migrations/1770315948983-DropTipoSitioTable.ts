import { MigrationInterface, QueryRunner } from "typeorm";

export class DropTipoSitioTable1770315948983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "tipo_sitios" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "tipos_sitio" CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
