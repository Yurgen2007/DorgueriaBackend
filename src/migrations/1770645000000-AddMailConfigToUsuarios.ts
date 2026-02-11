import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMailConfigToUsuarios1770645000000 implements MigrationInterface {
    name = 'AddMailConfigToUsuarios1770645000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."usuarios" ADD COLUMN IF NOT EXISTS "service_mail" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios" ADD COLUMN IF NOT EXISTS "mail_user" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios" ADD COLUMN IF NOT EXISTS "mail_password" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."usuarios" DROP COLUMN IF EXISTS "mail_password"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios" DROP COLUMN IF EXISTS "mail_user"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios" DROP COLUMN IF EXISTS "service_mail"`);
    }
}
