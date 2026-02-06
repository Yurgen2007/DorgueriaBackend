import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UnidadesMedidaService } from './unidades-medida.service';
import { CreateUnidadesMedidaDto, UpdateUnidadesMedidaDto } from './dto'; 
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('unidades-medida')
export class UnidadesMedidaController {
  constructor(private readonly unidadesMedidaService: UnidadesMedidaService) {}

  @Post()
  create(@Body() createUnidadesMedidaDto: CreateUnidadesMedidaDto) {
    return this.unidadesMedidaService.create(createUnidadesMedidaDto);
  }

  @Get()
  findAll() {
    return this.unidadesMedidaService.findAll();
  }

  @Get(':idUnidad')
  findOne(@Param('idUnidad') idUnidad: number) {
    return this.unidadesMedidaService.findOne(+idUnidad);
  }

  @Patch(':idUnidad')
  update(@Param('idUnidad') idUnidad: number, @Body() updateUnidadesMedidaDto: UpdateUnidadesMedidaDto) {
    return this.unidadesMedidaService.update(+idUnidad, updateUnidadesMedidaDto);
  }

  @Patch('state/:idUnidad')
  status(@Param('idUnidad') idUnidad: number) {
    return this.unidadesMedidaService.changeStatus(+idUnidad);
  }

  @Delete(':idUnidad')
  remove(@Param('idUnidad') idUnidad: number) {
    return this.unidadesMedidaService.remove(+idUnidad);
  }
}
