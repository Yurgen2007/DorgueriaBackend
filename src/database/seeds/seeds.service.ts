import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulos } from 'src/modulos/entities/modulo.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Rutas } from 'src/rutas/entities/ruta.entity';
import { Permisos } from 'src/permisos/entities/permiso.entity';
import { RolPermiso } from 'src/rol-permiso/entities/rol-permiso.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(Modulos)
    private readonly modulosRepository: Repository<Modulos>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
    @InjectRepository(Rutas)
    private readonly rutasRepository: Repository<Rutas>,
    @InjectRepository(Permisos)
    private readonly permisosRepository: Repository<Permisos>,
    @InjectRepository(RolPermiso)
    private readonly rolPermisoRepository: Repository<RolPermiso>,
  ) { }

  async seed() {
    const roles = [
      {
        idRol: 1,
        nombre: 'Administrador',
        estado: true,
      },
      {
        idRol: 2,
        nombre: 'Aprendiz',
        estado: true,
      },
    ];

    const users = [
      {
        idUsuario: 1,
        documento: 123456,
        nombre: 'Admin',
        apellido: 'Account',
        estado: true,
        password: 'Admin123456',
        fkRol: { idRol: 1 },
      },
    ];

    const modules = [
      {
        idModulo: 1,
        nombre: 'Admin',
        href: ' ',
        icono: 'UserIcon',
        estado: true,
      },
      {
        idModulo: 2,
        nombre: 'Bodega',
        href: ' ',
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
      {
        idRuta: 19,
        nombre: 'Tipos movimientos',
        href: 'bodega/tipos',
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
      { idPermiso: 28, permiso: 'Agregar Stock Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 29, permiso: 'Listar Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 30, permiso: 'Actualizar Inventario', fkRuta: { idRuta: 8 } },
      { idPermiso: 31, permiso: 'Eliminar Inventario', fkRuta: { idRuta: 8 } },
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
    ];

    const rol_permiso = [
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
      { idRolPermiso: 31, estado: true, fkPermiso: { idPermiso: 31 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 33, estado: true, fkPermiso: { idPermiso: 33 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 34, estado: true, fkPermiso: { idPermiso: 34 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 35, estado: true, fkPermiso: { idPermiso: 35 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 36, estado: true, fkPermiso: { idPermiso: 36 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 37, estado: true, fkPermiso: { idPermiso: 37 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 38, estado: true, fkPermiso: { idPermiso: 38 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 59, estado: true, fkPermiso: { idPermiso: 59 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 60, estado: true, fkPermiso: { idPermiso: 60 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 61, estado: true, fkPermiso: { idPermiso: 61 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 62, estado: true, fkPermiso: { idPermiso: 62 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 63, estado: true, fkPermiso: { idPermiso: 63 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 64, estado: true, fkPermiso: { idPermiso: 64 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 65, estado: true, fkPermiso: { idPermiso: 65 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 66, estado: true, fkPermiso: { idPermiso: 66 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 67, estado: true, fkPermiso: { idPermiso: 67 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 68, estado: true, fkPermiso: { idPermiso: 68 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 69, estado: true, fkPermiso: { idPermiso: 69 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 70, estado: true, fkPermiso: { idPermiso: 70 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 71, estado: true, fkPermiso: { idPermiso: 71 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 72, estado: true, fkPermiso: { idPermiso: 72 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 73, estado: true, fkPermiso: { idPermiso: 73 }, fkRol: { idRol: 1 } },
      { idRolPermiso: 74, estado: true, fkPermiso: { idPermiso: 74 }, fkRol: { idRol: 1 } },
    ];

    for (const role of roles) {
      const exists = await this.rolesRepository.findOneBy({
        idRol: role.idRol,
      });
      if (!exists)
        await this.rolesRepository.query(
          `INSERT INTO roles(id_rol, nombre, estado) VALUES ($1,$2,$3)`,
          [role.idRol, role.nombre, role.estado],
        );

      await this.usuariosRepository.query(
        `SELECT setval(pg_get_serial_sequence('roles', 'id_rol'), (SELECT MAX(id_rol) FROM roles))`,
      );
    }

    for (const module of modules) {
      const exists = await this.modulosRepository.findOneBy({
        idModulo: module.idModulo,
      });
      if (!exists)
        await this.modulosRepository.query(
          `INSERT INTO modulos(id_modulo, nombre, href, icono, estado) VALUES ($1,$2,$3,$4,$5)`,
          [
            module.idModulo,
            module.nombre,
            module.href,
            module.icono,
            module.estado,
          ],
        );

      await this.usuariosRepository.query(
        `SELECT setval(pg_get_serial_sequence('modulos', 'id_modulo'), (SELECT MAX(id_modulo) FROM modulos))`,
      );
    }

    for (const user of users) {
      const exists = await this.usuariosRepository.findOneBy({
        idUsuario: user.idUsuario,
      });

      if (!exists) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        await this.usuariosRepository.query(
          `INSERT INTO usuarios(id_usuario, documento, nombre, apellido, estado, password, fk_rol) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [
            user.idUsuario,
            user.documento,
            user.nombre,
            user.apellido,
            user.estado,
            hashedPassword,
            user.fkRol.idRol,
          ],
        );

        await this.usuariosRepository.query(
          `SELECT setval(pg_get_serial_sequence('usuarios', 'id_usuario'), (SELECT MAX(id_usuario) FROM usuarios))`,
        );
      }
    }

    for (const ruta of rutas) {
      const exists = await this.rutasRepository.findOneBy({
        idRuta: ruta.idRuta,
      });
      if (!exists)
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

      await this.usuariosRepository.query(
        `SELECT setval(pg_get_serial_sequence('rutas', 'id_ruta'), (SELECT MAX(id_ruta) FROM rutas))`,
      );
    }

    for (const permiso of permisos) {
      const exists = await this.permisosRepository.findOneBy({
        idPermiso: permiso.idPermiso,
      });
      if (!exists)
        await this.permisosRepository.query(
          `INSERT INTO permisos(id_permiso, permiso, fk_ruta) VALUES ($1,$2,$3)`,
          [permiso.idPermiso, permiso.permiso, permiso.fkRuta.idRuta],
        );

      await this.usuariosRepository.query(
        `SELECT setval(pg_get_serial_sequence('permisos', 'id_permiso'), (SELECT MAX(id_permiso) FROM permisos))`,
      );
    }

    for (const rolPermiso of rol_permiso) {
      const exists = await this.rolPermisoRepository.findOneBy({
        idRolPermiso: rolPermiso.idRolPermiso,
      });
      if (!exists)
        await this.rolPermisoRepository.query(
          `INSERT INTO rol_permiso(id_rol_permiso, estado, fk_permiso, fk_rol) VALUES ($1,$2,$3,$4)`,
          [
            rolPermiso.idRolPermiso,
            rolPermiso.estado,
            rolPermiso.fkPermiso.idPermiso,
            rolPermiso.fkRol.idRol,
          ],
        );

      await this.usuariosRepository.query(
        `SELECT setval(pg_get_serial_sequence('rol_permiso', 'id_rol_permiso'), (SELECT MAX(id_rol_permiso) FROM rol_permiso))`,
      );
    }

    console.log('Seeding completado!');
  }
}
