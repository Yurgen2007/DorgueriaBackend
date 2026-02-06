import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventarios } from './entities/inventario.entity';
import { ElementosModule } from '../elementos/elementos.module';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';

import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';

@Module({
  controllers: [InventariosController],
  providers: [InventariosService],
  imports: [TypeOrmModule.forFeature([Inventarios, CodigoInventario]), NotificacionesModule, ElementosModule],
  exports: [TypeOrmModule]
})
export class InventariosModule { }
