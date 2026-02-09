import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCodigoBarrasToElementos1770412000000 implements MigrationInterface {
  name = 'AddCodigoBarrasToElementos1770412000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "elementos" ADD COLUMN "codigo_barras" character varying(100)`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_elementos_codigo_barras" ON "elementos" ("codigo_barras")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_elementos_codigo_barras"`);
    await queryRunner.query(`ALTER TABLE "elementos" DROP COLUMN IF EXISTS "codigo_barras"`);
  }
}
