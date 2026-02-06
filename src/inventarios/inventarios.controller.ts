import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { ElementosService } from 'src/elementos/elementos.service';
import {
  AgregarStockDto,
  CreateInventarioDto,
  UpdateInventarioDto,
} from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';

// @UseGuards(JwtGuard, PermisoGuard)
@Controller('inventarios')
export class InventariosController {
  constructor(
    private readonly inventariosService: InventariosService,
    private readonly elementosService: ElementosService,
  ) { }

  @Post()
  @Permiso(27)
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Post('agregateStock')
  @Permiso(28)
  agregateStock(@Body() agregateStockDto: AgregarStockDto) {
    return this.elementosService.agregateStock(agregateStockDto);
  }

  @Get()
  @Permiso(29)
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get(':idInventario')
  findOne(@Param('idInventario') idInventario: number) {
    return this.inventariosService.findOne(+idInventario);
  }

  @Patch(':idInventario')
  @Permiso(30)
  update(@Param('idInventario') idInventario: number, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventariosService.update(+idInventario, updateInventarioDto);
  }

  @Patch('state/:idInventario')
  @Permiso(31)
  stastus(@Param('idInventario') idInventario: number) {
    return this.inventariosService.changeStatus(+idInventario);
  }

  @Delete(':idInventario')
  @Permiso(32)
  remove(@Param('idInventario') idInventario: number) {
    return this.inventariosService.remove(+idInventario);
  }

  @Get('codigos-devolucion/:id')
  getCodigosParaDevolucion(@Param('id') id: string) {
    return this.elementosService.getCodigosParaDevolucion(+id);
  }
}
