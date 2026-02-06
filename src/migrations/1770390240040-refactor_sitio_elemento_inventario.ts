import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorSitioElementoInventario1770390240040 implements MigrationInterface {
    name = 'RefactorSitioElementoInventario1770390240040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventarios" DROP CONSTRAINT "FK_192e705da5dfec791d09b16be29"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP CONSTRAINT "FK_80aa7d1c605be0d8281f3127f78"`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" DROP CONSTRAINT "FK_0fe8d1c31f364b07cd844884627"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_6f9db72a8aced37f5f40acdb59c"`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" RENAME COLUMN "fk_inventario" TO "fk_elemento"`);
        await queryRunner.query(`ALTER TABLE "movimientos" RENAME COLUMN "fk_inventario" TO "fk_elemento"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP COLUMN "fk_elemento"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP COLUMN "fk_sitio"`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD "nombre" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD "stock" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD "fk_sitio" integer`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD "fk_inventario" integer`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_4c0a5ddda14989500e9a6e10a3d" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_63a86ee0a9a520ca7196987bf1f" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_497a0834d12d795d63e9de6b20d" FOREIGN KEY ("fk_sitio") REFERENCES "sitios"("id_sitio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_fe5217635d2816d5b5f4abe0b12" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "elementos" DROP CONSTRAINT "FK_fe5217635d2816d5b5f4abe0b12"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP CONSTRAINT "FK_497a0834d12d795d63e9de6b20d"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_63a86ee0a9a520ca7196987bf1f"`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" DROP CONSTRAINT "FK_4c0a5ddda14989500e9a6e10a3d"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP COLUMN "fk_inventario"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP COLUMN "fk_sitio"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD "fk_sitio" integer`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD "fk_elemento" integer`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD "stock" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movimientos" RENAME COLUMN "fk_elemento" TO "fk_inventario"`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" RENAME COLUMN "fk_elemento" TO "fk_inventario"`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_6f9db72a8aced37f5f40acdb59c" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_0fe8d1c31f364b07cd844884627" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD CONSTRAINT "FK_80aa7d1c605be0d8281f3127f78" FOREIGN KEY ("fk_sitio") REFERENCES "sitios"("id_sitio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD CONSTRAINT "FK_192e705da5dfec791d09b16be29" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
