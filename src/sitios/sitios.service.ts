import { Injectable } from '@nestjs/common';
import { CreateSitioDto, UpdateSitioDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitios } from './entities/sitio.entity';
import { Repository } from 'typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Elementos } from 'src/elementos/entities/elemento.entity';

@Injectable()
export class SitiosService {
  constructor(
    @InjectRepository(Sitios)
    private readonly sitioRepository: Repository<Sitios>,
  ) { }
  async create(createSitioDto: CreateSitioDto): Promise<Sitios> {
    const sitio = this.sitioRepository.create({
      nombre: createSitioDto.nombre,
      estante: createSitioDto.estante,
      pasillo: createSitioDto.pasillo,
    });

    return await this.sitioRepository.save(sitio);
  }

  async findAll(): Promise<Sitios[]> {
    return await this.sitioRepository.find({ relations: [] });
  }

  async findOne(idSitio: number): Promise<Sitios> {
    const getSitio = await this.sitioRepository.findOneBy({ idSitio });

    if (!getSitio) {
      throw new Error(`No se encuentra el sitio con el id ${idSitio}`);
    }

    return getSitio;
  }

  async update(idSitio: number, updateSitioDto: UpdateSitioDto) {
    const getSitioById = await this.sitioRepository.findOneBy({
      idSitio,
    });

    if (!getSitioById) {
      throw new Error(`No existe el sitio con el id ${idSitio}`);
    }

    await this.sitioRepository.update(idSitio, {
      nombre: updateSitioDto.nombre,
      estante: updateSitioDto.estante,
      pasillo: updateSitioDto.pasillo,
    });

    return getSitioById;
  }

  async remove(idSitio: number) {
    const sitio = await this.sitioRepository.findOneBy({ idSitio });
    if (!sitio) {
      throw new Error(`No existe el sitio con el id ${idSitio}`);
    }
    await this.sitioRepository.delete(idSitio);
    return { message: 'Sitio eliminado correctamente' };
  }
}
