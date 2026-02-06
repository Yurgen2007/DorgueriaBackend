import { MigrationInterface, QueryRunner } from "typeorm";

export class DropTablasUbicacion1756342000000 implements MigrationInterface {
    name = 'DropTablasUbicacion1756342000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Eliminar tablas en orden inverso (por las FK)
        await queryRunner.dropTable('sedes');
        await queryRunner.dropTable('centros');
        await queryRunner.dropTable('municipios');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recrear tablas si se necesita hacer rollback
        await queryRunner.query(`
            CREATE TABLE municipios (
                id_municipio SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                codigo_dane VARCHAR(20),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE centros (
                id_centro SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                fk_municipio INTEGER REFERENCES municipios(id_municipio),
                estado BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE sedes (
                id_sede SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                fk_centro INTEGER REFERENCES centros(id_centro),
                estado BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);
    }
}
