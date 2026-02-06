import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CaracteristicasService } from './caracteristicas.service';
import { CreateCaracteristicaDto, UpdateCaracteristicaDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('caracteristicas')
export class CaracteristicasController {
  constructor(private readonly caracteristicasService: CaracteristicasService) {}

  @Post()
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicasService.create(createCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.caracteristicasService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.caracteristicasService.findOne(name);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
    return this.caracteristicasService.update(+id, updateCaracteristicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caracteristicasService.remove(+id);
  }
}
