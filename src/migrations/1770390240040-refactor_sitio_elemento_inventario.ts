import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorSitioElementoInventario1770390240040 implements MigrationInterface {
    name = 'RefactorSitioElementoInventario1770390240040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" DROP CONSTRAINT IF EXISTS "FK_192e705da5dfec791d09b16be29"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" DROP CONSTRAINT IF EXISTS "FK_80aa7d1c605be0d8281f3127f78"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" DROP CONSTRAINT IF EXISTS "FK_0fe8d1c31f364b07cd844884627"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP CONSTRAINT IF EXISTS "FK_6f9db72a8aced37f5f40acdb59c"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" RENAME COLUMN "fk_inventario" TO "fk_elemento"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" RENAME COLUMN "fk_inventario" TO "fk_elemento"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" DROP COLUMN IF EXISTS "stock"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" DROP COLUMN IF EXISTS "fk_elemento"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" DROP COLUMN IF EXISTS "fk_sitio"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" ADD COLUMN "nombre" character varying(100)`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" ADD COLUMN "stock" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" ADD COLUMN "fk_sitio" integer`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" ADD COLUMN "fk_inventario" integer`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_4c0a5ddda14989500e9a6e10a3d" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_63a86ee0a9a520ca7196987bf1f" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_497a0834d12d795d63e9de6b20d" FOREIGN KEY ("fk_sitio") REFERENCES "sitios"("id_sitio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_fe5217635d2816d5b5f4abe0b12" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" DROP CONSTRAINT IF EXISTS "FK_fe5217635d2816d5b5f4abe0b12"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" DROP CONSTRAINT IF EXISTS "FK_497a0834d12d795d63e9de6b20d"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" DROP CONSTRAINT IF EXISTS "FK_63a86ee0a9a520ca7196987bf1f"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" DROP CONSTRAINT IF EXISTS "FK_4c0a5ddda14989500e9a6e10a3d"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" DROP COLUMN IF EXISTS "fk_inventario"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" DROP COLUMN IF EXISTS "fk_sitio"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "elementos" DROP COLUMN IF EXISTS "stock"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" DROP COLUMN IF EXISTS "nombre"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" ADD COLUMN "fk_sitio" integer`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" ADD COLUMN "fk_elemento" integer`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "inventarios" ADD COLUMN "stock" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "movimientos" RENAME COLUMN "fk_elemento" TO "fk_inventario"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS "codigo_inventario" RENAME COLUMN "fk_elemento" TO "fk_inventario"`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_6f9db72a8aced37f5f40acdb59c" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_0fe8d1c31f364b07cd844884627" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD CONSTRAINT "FK_80aa7d1c605be0d8281f3127f78" FOREIGN KEY ("fk_sitio") REFERENCES "sitios"("id_sitio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD CONSTRAINT "FK_192e705da5dfec791d09b16be29" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
