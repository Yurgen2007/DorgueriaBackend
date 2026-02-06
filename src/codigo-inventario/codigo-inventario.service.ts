import { Injectable } from '@nestjs/common';
import { CreateCodigoInventarioDto } from './dto/create-codigo-inventario.dto';
import { UpdateCodigoInventarioDto } from './dto/update-codigo-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigoInventario } from './entities/codigo-inventario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodigoInventarioService {
  constructor(
    @InjectRepository(CodigoInventario)
    private readonly codigoRepository: Repository<CodigoInventario>,
  ) { }
  async create(
    createCodigoInventarioDto: CreateCodigoInventarioDto,
  ): Promise<CodigoInventario> {
    const codigo = this.codigoRepository.create({
      codigo: createCodigoInventarioDto.codigo,
      fkElemento: { idElemento: createCodigoInventarioDto.fkElemento } as any,
    });

    return await this.codigoRepository.save(codigo);
  }

  async findAll(): Promise<CodigoInventario[]> {
    return await this.codigoRepository.find({
      relations: ['fkElemento'],
    });
  }

  async findOne(idCodigoInventario: number): Promise<CodigoInventario | null> {
    const getCodigoById = await this.codigoRepository.findOneBy({
      idCodigoInventario,
    });

    if (!getCodigoById) {
      throw new Error(
        `No se encuentra el codigo con el id ${idCodigoInventario}`,
      );
    }

    return getCodigoById;
  }

  async update(
    idCodigoInventario: number,
    updateCodigoInventarioDto: UpdateCodigoInventarioDto,
  ) {
    const getCodigoById = await this.codigoRepository.findOneBy({
      idCodigoInventario,
    });

    if (!getCodigoById) {
      throw new Error(`No se encontro el codigo correspondiente a este id`);
    }

    Object.assign(getCodigoById, updateCodigoInventarioDto);

    const updatedCodigo = await this.codigoRepository.save(getCodigoById);
    return updatedCodigo;
  }
}
