import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncCurrentSchema1771000000000 implements MigrationInterface {
    name = 'SyncCurrentSchema1771000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tablas si no existen (usando IF NOT EXISTS para ser idempotente)

        // Tabla: roles
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "roles" (
                "id_rol" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70),
                "estado" BOOLEAN,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            )
        `);

        // Tabla: usuarios
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usuarios" (
                "id_usuario" SERIAL PRIMARY KEY,
                "documento" INTEGER UNIQUE,
                "nombre" VARCHAR(70),
                "apellido" VARCHAR(70),
                "edad" INTEGER,
                "telefono" VARCHAR(15),
                "correo" VARCHAR(70),
                "estado" BOOLEAN,
                "cargo" VARCHAR(70),
                "password" VARCHAR(60),
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "perfil" VARCHAR(255),
                "service_mail" VARCHAR(50),
                "mail_user" VARCHAR(100),
                "mail_password" VARCHAR(255),
                "fk_rol" INTEGER REFERENCES "roles"("id_rol")
            )
        `);

        // Tabla: notificaciones
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "notificaciones" (
                "id_notificacion" SERIAL PRIMARY KEY,
                "titulo" VARCHAR(205) NOT NULL,
                "mensaje" VARCHAR(500),
                "leido" BOOLEAN DEFAULT FALSE,
                "requiere_accion" BOOLEAN DEFAULT FALSE,
                "estado" VARCHAR(50),
                "data" JSONB,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "fk_usuario" INTEGER REFERENCES "usuarios"("id_usuario")
            )
        `);

        // Tabla: modulos
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "modulos" (
                "id_modulo" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70),
                "descripcion" VARCHAR(205),
                "href" VARCHAR(205),
                "icono" VARCHAR(205) NOT NULL,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "estado" BOOLEAN
            )
        `);

        // Tabla: rutas
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "rutas" (
                "id_ruta" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(205),
                "descripcion" VARCHAR(205),
                "href" VARCHAR(205) NOT NULL,
                "icono" VARCHAR(205),
                "listed" BOOLEAN NOT NULL DEFAULT FALSE,
                "estado" BOOLEAN,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "fk_modulo" INTEGER REFERENCES "modulos"("id_modulo")
            )
        `);

        // Tabla: permisos
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "permisos" (
                "id_permiso" SERIAL PRIMARY KEY,
                "permiso" VARCHAR(100),
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "fk_ruta" INTEGER REFERENCES "rutas"("id_ruta") ON DELETE CASCADE
            )
        `);

        // Tabla: rol_permiso
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "rol_permiso" (
                "id_rol_permiso" SERIAL PRIMARY KEY,
                "estado" BOOLEAN,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "fk_permiso" INTEGER REFERENCES "permisos"("id_permiso"),
                "fk_rol" INTEGER REFERENCES "roles"("id_rol")
            )
        `);

        // Tabla: sitios
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sitios" (
                "id_sitio" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70),
                "estante" VARCHAR(20),
                "pasillo" VARCHAR(20),
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            )
        `);

        // Tabla: inventarios
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "inventarios" (
                "id_inventario" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(100),
                "estado" BOOLEAN DEFAULT TRUE,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            )
        `);

        // Tabla: categorias
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "categorias" (
                "id_categoria" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70),
                "estado" BOOLEAN,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            )
        `);

        // Tabla: unidades_medida
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "unidades_medida" (
                "id_unidad" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70) NOT NULL,
                "estado" BOOLEAN NOT NULL,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            )
        `);

        // Tabla: caracteristicas
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "caracteristicas" (
                "id_caracteristica" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70),
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW()
            )
        `);

        // Tabla: elementos
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "elementos" (
                "id_elemento" SERIAL PRIMARY KEY,
                "nombre" VARCHAR(70),
                "descripcion" VARCHAR(205),
                "codigo_barras" VARCHAR(100) UNIQUE,
                "estado" BOOLEAN,
                "stock" INTEGER DEFAULT 0,
                "fecha_vencimiento" DATE,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "imagen" VARCHAR(255),
                "fk_caracteristica" INTEGER REFERENCES "caracteristicas"("id_caracteristica"),
                "fk_categoria" INTEGER NOT NULL REFERENCES "categorias"("id_categoria"),
                "fk_unidad_medida" INTEGER NOT NULL REFERENCES "unidades_medida"("id_unidad"),
                "fk_sitio" INTEGER REFERENCES "sitios"("id_sitio"),
                "fk_inventario" INTEGER NOT NULL REFERENCES "inventarios"("id_inventario")
            )
        `);

        // Tabla: codigo_inventario
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "codigo_inventario" (
                "id_codigo_inventario" SERIAL PRIMARY KEY,
                "codigo" TEXT NOT NULL,
                "uso" BOOLEAN DEFAULT FALSE,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                "fk_elemento" INTEGER REFERENCES "elementos"("id_elemento")
            )
        `);

        // Crear índices para mejorar rendimiento
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usuarios_fk_rol" ON "usuarios"("fk_rol")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_notificaciones_fk_usuario" ON "notificaciones"("fk_usuario")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_rutas_fk_modulo" ON "rutas"("fk_modulo")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_permisos_fk_ruta" ON "permisos"("fk_ruta")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_rol_permiso_fk_rol" ON "rol_permiso"("fk_rol")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_rol_permiso_fk_permiso" ON "rol_permiso"("fk_permiso")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_elementos_fk_categoria" ON "elementos"("fk_categoria")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_elementos_fk_inventario" ON "elementos"("fk_inventario")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_elementos_fk_sitio" ON "elementos"("fk_sitio")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_codigo_inventario_fk_elemento" ON "codigo_inventario"("fk_elemento")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Esta migración es idempotente hacia arriba, hacia abajo simplemente no hace nada
        // ya que solo crea tablas si no existen
    }
}
