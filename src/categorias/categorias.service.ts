import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,
  ) {}

  async create(newCategoria: CreateCategoriaDto) {
    const categoria = this.categoriasRepository.create(newCategoria);
    return await this.categoriasRepository.save(categoria);
  }

  findAll() {
    return this.categoriasRepository.find();
  }

  async findOne(nombre: string) {
    const categoria = await this.categoriasRepository.findOneBy({ nombre });
    if (!categoria)
      throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    return categoria;
  }

  update(id: number, updateCategoria: UpdateCategoriaDto) {
    return this.categoriasRepository.update(id, updateCategoria);
  }

  async updatestate(id: number) {
    const categoria = await this.categoriasRepository.findOne({
      where: {
        idCategoria: id,
      },
    });
    if (!categoria)
      throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    return this.categoriasRepository.update(id, { estado: !categoria.estado });
  }

  async remove(id: number) {
    const categoria = await this.categoriasRepository.findOne({
      where: { idCategoria: id },
    });
    if (!categoria)
      throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    await this.categoriasRepository.delete(id);
    return { message: 'Categoria eliminada correctamente' };
  }
}
