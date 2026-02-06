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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.categoriasService.findOne(nombre);
  }

  @Patch('update/:idCategoria')
  update(@Param('idCategoria') idCategoria: string, @Body() updateCategoria: UpdateCategoriaDto) {
    return this.categoriasService.update(+idCategoria, updateCategoria);
  }

  @Patch('estado/:idCategoria')
  updatestate(@Param('idCategoria') idCategoria: string) {
    return this.categoriasService.updatestate(+idCategoria);
  }

  @Delete(':idCategoria')
  remove(@Param('idCategoria') idCategoria: string) {
    return this.categoriasService.remove(+idCategoria);
  }
}
