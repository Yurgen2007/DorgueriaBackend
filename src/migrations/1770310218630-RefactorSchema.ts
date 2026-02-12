import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorSchema1770310218630 implements MigrationInterface {
    name = 'RefactorSchema1770310218630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if table exists before altering
        const lotesExists = await queryRunner.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lotes')`);
        
        if (lotesExists[0]?.exists) {
            await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT IF EXISTS "FK_a69cba4795d6f8deaf1e31a3a54"`);
            await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT IF EXISTS "FK_917eb9257ccac2cbba93dc34424"`);
            await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_lotes_numero_lote"`);
            await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_lotes_fecha_vencimiento"`);
            await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_lotes_fk_elemento"`);
            await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_lotes_fk_inventario"`);
            await queryRunner.query(`ALTER TABLE "lotes" DROP COLUMN IF EXISTS "fecha_vencimiento"`);
            await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "created_at" SET DEFAULT now()`);
            await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "updated_at" SET DEFAULT now()`);
            await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "fk_elemento" DROP NOT NULL`);
            await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "fk_inventario" DROP NOT NULL`);
            await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_af19a064c331e76c7ed1993c6d" ON "lotes" ("numero_lote") `);
            await queryRunner.query(`ALTER TABLE "lotes" ADD CONSTRAINT IF NOT EXISTS "FK_a69cba4795d6f8deaf1e31a3a54" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE "lotes" ADD CONSTRAINT IF NOT EXISTS "FK_917eb9257ccac2cbba93dc34424" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        }
        
        const sitiosExists = await queryRunner.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'sitios')`);
        if (sitiosExists[0]?.exists) {
            await queryRunner.query(`ALTER TABLE "sitios" DROP CONSTRAINT IF EXISTS "FK_00c011c095cf947d6989ac14b81"`);
            await queryRunner.query(`ALTER TABLE "sitios" DROP COLUMN IF EXISTS "estado"`);
            await queryRunner.query(`ALTER TABLE "sitios" DROP COLUMN IF EXISTS "fk_tipo_sitio"`);
            await queryRunner.query(`ALTER TABLE "sitios" DROP COLUMN IF EXISTS "persona_encargada"`);
            await queryRunner.query(`ALTER TABLE "sitios" DROP COLUMN IF EXISTS "ubicacion"`);
            await queryRunner.query(`ALTER TABLE "sitios" DROP COLUMN IF EXISTS "nivel"`);
        }
        
        const categoriasExists = await queryRunner.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'categorias')`);
        if (categoriasExists[0]?.exists) {
            await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN IF EXISTS "codigo_unpsc"`);
        }
        
        const elementosExists = await queryRunner.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'elementos')`);
        if (elementosExists[0]?.exists) {
            await queryRunner.query(`ALTER TABLE "elementos" ADD COLUMN IF NOT EXISTS "fecha_vencimiento" date`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT IF EXISTS "FK_917eb9257ccac2cbba93dc34424"`);
        await queryRunner.query(`ALTER TABLE "lotes" DROP CONSTRAINT IF EXISTS "FK_a69cba4795d6f8deaf1e31a3a54"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_af19a064c331e76c7ed1993c6d"`);
        await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "fk_inventario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "fk_elemento" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "lotes" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP COLUMN IF EXISTS "fecha_vencimiento"`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD COLUMN IF NOT EXISTS "nivel" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD COLUMN IF NOT EXISTS "ubicacion" character varying(205)`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD COLUMN IF NOT EXISTS "persona_encargada" character varying(70)`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD COLUMN IF NOT EXISTS "fk_tipo_sitio" integer`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD COLUMN IF NOT EXISTS "estado" boolean`);
        await queryRunner.query(`ALTER TABLE "lotes" ADD COLUMN IF NOT EXISTS "fecha_vencimiento" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD COLUMN IF NOT EXISTS "codigo_unpsc" text`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lotes_fk_inventario" ON "lotes" ("fk_inventario") `);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lotes_fk_elemento" ON "lotes" ("fk_elemento") `);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lotes_fecha_vencimiento" ON "lotes" ("fecha_vencimiento") `);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lotes_numero_lote" ON "lotes" ("numero_lote") `);
        await queryRunner.query(`ALTER TABLE "sitios" ADD CONSTRAINT IF NOT EXISTS "FK_00c011c095cf947d6989ac14b81" FOREIGN KEY ("fk_tipo_sitio") REFERENCES "tipo_sitios"("id_tipo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lotes" ADD CONSTRAINT IF NOT EXISTS "FK_917eb9257ccac2cbba93dc34424" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lotes" ADD CONSTRAINT IF NOT EXISTS "FK_a69cba4795d6f8deaf1e31a3a54" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
