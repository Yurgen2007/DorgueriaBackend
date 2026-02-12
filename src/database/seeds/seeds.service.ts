import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../roles/entities/role.entity';
import { Modulos } from '../../modulos/entities/modulo.entity';
import { Rutas } from '../../rutas/entities/ruta.entity';
import { Permisos } from '../../permisos/entities/permiso.entity';
import { RolPermiso } from '../../rol-permiso/entities/rol-permiso.entity';
import { Usuarios } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(Modulos)
    private modulosRepository: Repository<Modulos>,
    @InjectRepository(Rutas)
    private rutasRepository: Repository<Rutas>,
    @InjectRepository(Permisos)
    private permisosRepository: Repository<Permisos>,
    @InjectRepository(RolPermiso)
    private rolPermisoRepository: Repository<RolPermiso>,
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async seed() {
    console.log('cli seed:database');

    console.log('Poblar la base de datos con datos defecto');

    const roles = [
      { idRol: 1, nombre: 'Administrador', estado: true },
      { idRol: 2, nombre: 'Vendedor', estado: true },
    ];

    const modulos = [
      {
        idModulo: 1,
        nombre: 'Admin',
        href: null,
        icono: 'UserIcon',
        estado: true,
      },
      {
        idModulo: 2,
        nombre: 'Bodega',
        href: null,
        icono: 'ArchiveBoxIcon',
        estado: true,
      },
    ];

    const rutas = [
      {
        idRuta: 1,
        nombre: 'Usuarios',
        href: 'admin/usuarios',
        fkModulo: { idModulo: 1 },
        icono: 'UserIcon',
        listed: true,
        estado: true,
      },
      {
        idRuta: 4,
        nombre: 'Sitios',
        href: 'admin/sitios',
        fkModulo: { idModulo: 1 },
        icono: 'BuildingOfficeIcon',
        listed: true,
        estado: true,
      },
      {
        idRuta: 6,
        nombre: 'Elementos',
        href: 'bodega/elementos',
        icono: 'CubeIcon',
        listed: true,
        estado: true,
        fkModulo: { idModulo: 2 },
      },
      {
        idRuta: 8,
        nombre: 'Inventarios',
        href: 'bodega/inventario',
        icono: 'ClipboardDocumentListIcon',
        listed: true,
        estado: true,
        fkModulo: { idModulo: 2 },
      },
      {
        idRuta: 10,
        nombre: 'Roles',
        href: 'admin/roles',
        listed: false,
        estado: true,
        fkModulo: { idModulo: 1 },
      },
      {
        idRuta: 16,
        nombre: 'Unidades medida',
        href: 'bodega/unidades',
        listed: false,
        estado: true,
        fkModulo: { idModulo: 2 },
      },
      {
        idRuta: 17,
        nombre: 'Categorias',
        href: 'bodega/categorias',
        listed: false,
        estado: true,
        fkModulo: { idModulo: 2 },
      },
      {
        idRuta: 18,
        nombre: 'Caracteristicas',
        href: 'bodega/caracteristicas',
        listed: false,
        estado: true,
        fkModulo: { idModulo: 2 },
      },
    ];

    const permisos = [
      { idPermiso: 1, permiso: 'Crear Usuario', fkRuta: { idRuta: 1 } },
      { idPermiso: 2, permiso: 'Registro Masivo', fkRuta: { idRuta: 1 } },
      { idPermiso: 3, permiso: 'Listar Usuarios', fkRuta: { idRuta: 1 } },
      { idPermiso: 4, permiso: 'Actualizar Usuario', fkRuta: { idRuta: 1 } },
      { idPermiso: 5, permiso: 'Eliminar Usuario', fkRuta: { idRuta: 1 } },
      { idPermiso: 14, permiso: 'Crear Sitio', fkRuta: { idRuta: 4 } },
      { idPermiso: 15, permiso: 'Listar Sitios', fkRuta: { idRuta: 4 } },
      { idPermiso: 16, permiso: 'Actualizar Sitio', fkRuta: { idRuta: 4 } },
      { idPermiso: 17, permiso: 'Eliminar Sitio', fkRuta: { idRuta: 4 } },
      { idPermiso: 18, permiso: 'Crear Elemento', fkRuta: { idRuta: 6 } },
      { idPermiso: 19, permiso: 'Listar Elemento', fkRuta: { idRuta: 6 } },
      { idPermiso: 20, permiso: 'Actualizar Elemento', fkRuta: { idRuta: 6 } },
      { idPermiso: 21, permiso: 'Eliminar Elemento', fkRuta: { idRuta: 6 } },
      { idPermiso: 27, permiso: 'Crear Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 28, permiso: 'Limitar Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 29, permiso: 'Listar Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 30, permiso: 'Desactivar Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 33, permiso: 'Crear Rol', fkRuta: { idRuta: 10 } },
      { idPermiso: 34, permiso: 'Listar Roles', fkRuta: { idRuta: 10 } },
      { idPermiso: 35, permiso: 'Actualizar Rol', fkRuta: { idRuta: 10 } },
      { idPermiso: 36, permiso: 'Eliminar Rol', fkRuta: { idRuta: 10 } },
      { idPermiso: 37, permiso: 'Actualizar Permiso', fkRuta: { idRuta: 10 } },
      { idPermiso: 38, permiso: 'Asignar Permiso', fkRuta: { idRuta: 10 } },
      { idPermiso: 59, permiso: 'Crear unidad medida', fkRuta: { idRuta: 16 } },
      { idPermiso: 60, permiso: 'Listar unidad medida', fkRuta: { idRuta: 16 } },
      { idPermiso: 61, permiso: 'Actualizar unidad medida', fkRuta: { idRuta: 16 } },
      { idPermiso: 62, permiso: 'Eliminar unidad medida', fkRuta: { idRuta: 16 } },
      { idPermiso: 63, permiso: 'Crear categoria', fkRuta: { idRuta: 17 } },
      { idPermiso: 64, permiso: 'Listar categoria', fkRuta: { idRuta: 17 } },
      { idPermiso: 65, permiso: 'Actualizar categoria', fkRuta: { idRuta: 17 } },
      { idPermiso: 66, permiso: 'Eliminar categoria', fkRuta: { idRuta: 17 } },
      { idPermiso: 67, permiso: 'Crear caracteristica', fkRuta: { idRuta: 18 } },
      { idPermiso: 68, permiso: 'Listar caracteristicas', fkRuta: { idRuta: 18 } },
      { idPermiso: 69, permiso: 'Actualizar caracteristica', fkRuta: { idRuta: 18 } },
      { idPermiso: 70, permiso: 'Eliminar caracteristica', fkRuta: { idRuta: 18 } },
      { idPermiso: 71, permiso: 'Exportar PDF', fkRuta: { idRuta: 6 } },
      { idPermiso: 72, permiso: 'Vender', fkRuta: { idRuta: 6 } },
    ];

    const rol_permiso = [
      // Administrador tiene TODOS los permisos
      { idRolPermiso: 1, estado: true, fkPermiso: { idPermiso: 1 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 2, estado: true, fkPermiso: { idPermiso: 2 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 3, estado: true, fkPermiso: { idPermiso: 3 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 4, estado: true, fkPermiso: { idPermiso: 4 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 5, estado: true, fkPermiso: { idPermiso: 5 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 14, estado: true, fkPermiso: { idPermiso: 14 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 15, estado: true, fkPermiso: { idPermiso: 15 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 16, estado: true, fkPermiso: { idPermiso: 16 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 17, estado: true, fkPermiso: { idPermiso: 17 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 18, estado: true, fkPermiso: { idPermiso: 18 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 19, estado: true, fkPermiso: { idPermiso: 19 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 20, estado: true, fkPermiso: { idPermiso: 20 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 21, estado: true, fkPermiso: { idPermiso: 21 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 27, estado: true, fkPermiso: { idPermiso: 27 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 28, estado: true, fkPermiso: { idPermiso: 28 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 29, estado: true, fkPermiso: { idPermiso: 29 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 30, estado: true, fkPermiso: { idPermiso: 30 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 33, estado: true, fkPermiso: { idPermiso: 33 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 34, estado: true, fkPermiso: { idPermiso: 34 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 35, estado: true, fkPermiso: { idPermiso: 35 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 36, estado: true, fkPermiso: { idPermiso: 36 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 37, estado: true, fkPermiso: { idPermiso: 37 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 38, estado: true, fkPermiso: { idPermiso: 38 }, fkRol: { idRol: 1 } },
      // Permisos de unidades medida
      { idRolPermiso: 59, estado: true, fkPermiso: { idPermiso: 59 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 60, estado: true, fkPermiso: { idPermiso: 60 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 61, estado: true, fkPermiso: { idPermiso: 61 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 62, estado: true, fkPermiso: { idPermiso: 62 }, fkRol: { idRol: 1 } },
      // Permisos de categorias
      { idRolPermiso: 63, estado: true, fkPermiso: { idPermiso: 63 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 64, estado: true, fkPermiso: { idPermiso: 64 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 65, estado: true, fkPermiso: { idPermiso: 65 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 66, estado: true, fkPermiso: { idPermiso: 66 }, fkRol: { idRol: 1 } },
      // Permisos de caracteristicas
      { idRolPermiso: 67, estado: true, fkPermiso: { idPermiso: 67 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 68, estado: true, fkPermiso: { idPermiso: 68 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 69, estado: true, fkPermiso: { idPermiso: 69 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 70, estado: true, fkPermiso: { idPermiso: 70 }, fkRol: { idRol: 1 } },
      // Exportar PDF solo para Administrador
      { idRolPermiso: 71, estado: true, fkPermiso: { idPermiso: 71 }, fkRol: { idRol: 1 } },
      // Vender solo para Administrador
      { idRolPermiso: 72, estado: true, fkPermiso: { idPermiso: 72 }, fkRol: { idRol: 1 } },
      // Vendedor puede: listar elementos, listar inventarios, vender
      { idRolPermiso: 73, estado: true, fkPermiso: { idPermiso: 19 }, fkRol: { idRol: 2 } },
      { idRolPermiso: 74, estado: true, fkPermiso: { idPermiso: 29 }, fkRol: { idRol: 2 } },
      { idRolPermiso: 75, estado: true, fkPermiso: { idPermiso: 72 }, fkRol: { idRol: 2 } },
    ];

    const users = [
      {
        idUsuario: 1,
        documento: 123456789,
        nombre: 'Admin',
        apellido: 'System',
        edad: 30,
        telefono: '3001234567',
        correo: 'farmamedicadrogueria48@gmail.com',
        estado: true,
        cargo: 'Administrador',
        password: 'Admin123',
        perfil: 'defaultPerfil.png',
        serviceMail: 'gmail',
        mailUser: 'farmamedicadrogueria48@gmail.com',
        mailPassword: 'wdis nwbw lgkg rivo',
        fkRol: { idRol: 1 },
      },
      {
        idUsuario: 2,
        documento: 111222,
        nombre: 'Vendedor',
        apellido: 'Default',
        edad: 25,
        telefono: '3000000000',
        correo: 'vendedor@farmamedica.com',
        estado: true,
        cargo: 'vendedor',
        password: 'Vendedor123',
        fkRol: { idRol: 2 },
      },
    ];

    // PRIMERO: Eliminar TODOS los registros de las tablas dependientes (en orden correcto)
    // 1. Eliminar todos los rol_permiso
    console.log('Eliminando rol_permiso...');
    await this.rolPermisoRepository.query(`DELETE FROM rol_permiso`);

    // 2. Eliminar todos los permisos
    console.log('Eliminando permisos...');
    await this.permisosRepository.query(`DELETE FROM permisos`);

    // 3. Eliminar todas las notificaciones
    console.log('Eliminando notificaciones...');
    await this.permisosRepository.query(`DELETE FROM notificaciones`);

    // 4. Eliminar todos los usuarios
    console.log('Eliminando usuarios...');
    await this.usuariosRepository.query(`DELETE FROM usuarios`);

    // 5. Eliminar todas las rutas
    console.log('Eliminando rutas...');
    await this.rutasRepository.query(`DELETE FROM rutas`);

    // 5. Eliminar todos los módulos
    console.log('Eliminando módulos...');
    await this.modulosRepository.query(`DELETE FROM modulos`);

    // 6. Eliminar todos los roles
    console.log('Eliminando roles...');
    await this.rolesRepository.query(`DELETE FROM roles`);

    // SEGUNDO: Insertar en el orden correcto
    // 1. Insertar roles
    console.log('Insertando roles...');
    for (const role of roles) {
      await this.rolesRepository.query(
        `INSERT INTO roles(id_rol, nombre, estado) VALUES ($1,$2,$3)`,
        [role.idRol, role.nombre, role.estado],
      );
    }

    // 2. Insertar módulos
    console.log('Insertando módulos...');
    for (const modulo of modulos) {
      await this.modulosRepository.query(
        `INSERT INTO modulos(id_modulo, nombre, href, icono, estado) VALUES ($1,$2,$3,$4,$5)`,
        [modulo.idModulo, modulo.nombre, modulo.href, modulo.icono, modulo.estado],
      );
    }

    // 3. Insertar usuarios
    console.log('Insertando usuarios...');
    for (const user of users) {
      const saltOrRounds = 10;
      // Si la contraseña ya es un hash de bcrypt (comienza con $2b$10$), usarla directamente
      const isHashedPassword = user.password.startsWith('$2b$10$');
      const hashedPassword = isHashedPassword
        ? user.password
        : await bcrypt.hash(user.password, saltOrRounds);
      await this.usuariosRepository.query(
        `INSERT INTO usuarios(id_usuario, documento, nombre, apellido, edad, telefono, correo, estado, password, cargo, perfil, service_mail, mail_user, mail_password, fk_rol) 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
        [
          user.idUsuario,
          user.documento,
          user.nombre,
          user.apellido,
          user.edad,
          user.telefono,
          user.correo,
          user.estado,
          hashedPassword,
          user.cargo,
          user.perfil || 'defaultPerfil.png',
          user.serviceMail || null,
          user.mailUser || null,
          user.mailPassword || null,
          user.fkRol.idRol,
        ],
      );
    }

    // 4. Insertar rutas
    console.log('Insertando rutas...');
    for (const ruta of rutas) {
      await this.rutasRepository.query(
        `INSERT INTO rutas(id_ruta, nombre, href, fk_modulo, icono, listed, estado) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          ruta.idRuta,
          ruta.nombre,
          ruta.href,
          ruta.fkModulo.idModulo,
          ruta.icono,
          ruta.listed,
          ruta.estado,
        ],
      );
    }

    // 5. Insertar permisos
    console.log('Insertando permisos...');
    for (const permiso of permisos) {
      await this.permisosRepository.query(
        `INSERT INTO permisos(id_permiso, permiso, fk_ruta) VALUES ($1,$2,$3)`,
        [permiso.idPermiso, permiso.permiso, permiso.fkRuta.idRuta],
      );
    }

    // 6. Insertar rol_permiso
    console.log('Insertando rol_permiso...');
    for (const rolPermiso of rol_permiso) {
      await this.rolPermisoRepository.query(
        `INSERT INTO rol_permiso(id_rol_permiso, estado, fk_permiso, fk_rol) VALUES ($1,$2,$3,$4)`,
        [
          rolPermiso.idRolPermiso,
          rolPermiso.estado,
          rolPermiso.fkPermiso.idPermiso,
          rolPermiso.fkRol.idRol,
        ],
      );
    }

    console.log('Seeding completado!');
  }
}
