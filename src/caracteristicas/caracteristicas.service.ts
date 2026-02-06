import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caracteristicas } from './entities/caracteristica.entity';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

@Injectable()
export class CaracteristicasService {
  constructor(
    @InjectRepository(Caracteristicas)
    private caracteristicasRepository: Repository<Caracteristicas>,
  ) {}

  async create(createCaracteristicaDto: CreateCaracteristicaDto) {
    const newCaracteristicas = this.caracteristicasRepository.create({
      ...createCaracteristicaDto,
    });

    const savedCaracteristica =
      await this.caracteristicasRepository.save(newCaracteristicas);
    return savedCaracteristica;
  }

  async findAll() {
    return await this.caracteristicasRepository.find();
  }

  async findOne(nombre: string) {
    const caracteristicas = await this.caracteristicasRepository.findOneBy({
      nombre,
    });
    if (!caracteristicas)
      throw new HttpException(
        'Caracteristica no encontrada',
        HttpStatus.NOT_FOUND,
      );
    return caracteristicas;
  }

  async update(id: number, updateCaracteristica: UpdateCaracteristicaDto) {
    const caracteristicas = await this.caracteristicasRepository.findOne({
      where: {
        idCaracteristica: id,
      },
    });
    if (!caracteristicas)
      throw new HttpException(
        'Caracteristica no encontrada',
        HttpStatus.NOT_FOUND,
      );

    const updatedCaracteristica = await this.caracteristicasRepository.update(
      id,
      {
        ...updateCaracteristica,
      },
    );
    if (!updatedCaracteristica.affected)
      throw new HttpException(
        'Error actualizano caracteristica',
        HttpStatus.BAD_REQUEST,
      );

    const newCaracteristica = await this.caracteristicasRepository.findOne({
      where: {
        idCaracteristica: id,
      },
    });
    return newCaracteristica;
  }

  async remove(id: number) {
    const caracteristica = await this.caracteristicasRepository.findOne({
      where: { idCaracteristica: id },
    });
    if (!caracteristica)
      throw new HttpException(
        'Caracteristica no encontrada',
        HttpStatus.NOT_FOUND,
      );

    const deleted = await this.caracteristicasRepository.delete(id);
    if (!deleted.affected)
      throw new HttpException(
        'Error al eliminar caracteristica',
        HttpStatus.BAD_REQUEST,
      );

    return { message: 'Caracteristica eliminada correctamente' };
  }
}
