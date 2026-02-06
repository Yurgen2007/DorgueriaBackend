import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ModulosModule } from './modulos/modulos.module';
import { RutasModule } from './rutas/rutas.module';
import { PermisosModule } from './permisos/permisos.module';



import { SitiosModule } from './sitios/sitios.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { CaracteristicasModule } from './caracteristicas/caracteristicas.module';
import { UnidadesMedidaModule } from './unidades-medida/unidades-medida.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ElementosModule } from './elementos/elementos.module';

import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { RolPermisoModule } from './rol-permiso/rol-permiso.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AuthModule } from './auth/auth.module';
import { CodigoInventarioModule } from './codigo-inventario/codigo-inventario.module';
import { WebsocketModule } from './websocket/websocket.module';
import { SeedsService } from './database/seeds/seeds.service';
import { SeedsModule } from './database/seeds/seeds.module';
import { CommandModule } from 'nestjs-command';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      autoLoadEntities: true,
      migrationsRun: true,
    }),
    RolesModule,
    UsuariosModule,
    ModulosModule,
    RutasModule,
    PermisosModule,

    SitiosModule,
    InventariosModule,
    CaracteristicasModule,
    UnidadesMedidaModule,
    CategoriasModule,
    ElementosModule,

    RolPermisoModule,
    NotificacionesModule,
    CodigoInventarioModule,
    AuthModule,
    WebsocketModule,
    CommandModule,
    SeedsModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    AppService,
    SeedsService,
  ],
})
export class AppModule { }
