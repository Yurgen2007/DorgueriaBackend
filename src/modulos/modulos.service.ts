import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulos } from './entities/modulo.entity';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModulosService {

  constructor(
    @InjectRepository(Modulos)
    private modulosRepository: Repository<Modulos>
  ){}

  async create(createModuloDto: CreateModuloDto) {
    const newModulo = this.modulosRepository.create(createModuloDto);
    const moduloCreated = await this.modulosRepository.save(newModulo);
    return moduloCreated;
  }

  async findAll() {
    return await this.modulosRepository.find();
  }

  async findOne(id: number) {
    const existingModulo = await this.modulosRepository.findOne({
      where: {
        idModulo: id
      }
    });
    if(!existingModulo) throw new HttpException("Modulo no encontrado", HttpStatus.NOT_FOUND);
    return existingModulo;
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {
    const existingModulo = await this.modulosRepository.findOne({
      where: {
        idModulo: id
      }
    });
    if(!existingModulo) throw new HttpException("Modulo no encontrado", HttpStatus.NOT_FOUND);

    const updatedModulo = await this.modulosRepository.update(id, updateModuloDto);
    if(!updatedModulo.affected) throw new HttpException("Error actualizando el modulo",HttpStatus.BAD_REQUEST);
    const newModulo = await this.modulosRepository.findOne({
      where: {
        idModulo: id
      }
    });
    return newModulo;
  }

  async updateStatus(id: number) {
    const existingModulo = await this.modulosRepository.findOne({
      where: {
        idModulo: id
      }
    });
    if(!existingModulo) throw new HttpException("Modulo no encontrado", HttpStatus.NOT_FOUND);
    return await this.modulosRepository.update(id,{estado: !existingModulo.estado});
  }

  async remove(id: number) {
    const existingModulo = await this.modulosRepository.findOne({
      where: {
        idModulo: id
      }
    });
    if(!existingModulo) throw new NotFoundException(`No se encontró el módulo con id ${id}`);

    await this.modulosRepository.remove(existingModulo);

    return {
      status: 200,
      message: 'Módulo eliminado correctamente',
    };
  }
}
