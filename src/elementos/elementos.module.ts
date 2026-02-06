import { Module } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { ElementosController } from './elementos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';
import { Elementos } from './entities/elemento.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';


@Module({
  controllers: [ElementosController],
  providers: [ElementosService],
  imports: [TypeOrmModule.forFeature([Elementos, Inventarios, Sitios, CodigoInventario]), NotificacionesModule],
  exports: [TypeOrmModule, ElementosService]
})
export class ElementosModule { }
