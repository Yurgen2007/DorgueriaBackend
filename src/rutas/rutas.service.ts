import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rutas } from './entities/ruta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutasService {

  constructor(
    @InjectRepository(Rutas)
    private rutasRepository: Repository<Rutas>,
  ) { }


  async create(newRut: CreateRutaDto) {
    const Rutas = this.rutasRepository.create({
      ...newRut,
      fkModulo: {
        idModulo: newRut.fkModulo
      }
    });
    return await this.rutasRepository.save(Rutas);
  }

  findAll() {
    return this.rutasRepository.find();
  }

  async findOne(nombre: string) {
  const ruta = await this.rutasRepository.findOneBy({nombre});
  if(!ruta) throw new HttpException("Ruta no encontrada", HttpStatus.NOT_FOUND);
  return ruta
  }

  async update(id: number, updateRuta: UpdateRutaDto) {

    const existingRuta = await this.rutasRepository.findOne({
      where: {
        idRuta: id
      },
      relations: ["fkModulo"]
    })
    if(!existingRuta) throw new HttpException("Ruta no encontrada",HttpStatus.NOT_FOUND);

    return await this.rutasRepository.update(id,{
      ...updateRuta,
      fkModulo : {
        idModulo: updateRuta.fkModulo ?? existingRuta.fkModulo.idModulo
      }
    });
  }

 async updatestate(id: number){
    const ruta = await this.rutasRepository.findOne({
      where: {
        idRuta: id
      }
    });
    if(!ruta) throw new HttpException("Ruta no encontrada", HttpStatus.NOT_FOUND)
    return this.rutasRepository.update(id,{estado : !(ruta.estado)})
  }

  async remove(id: number) {
    const ruta = await this.rutasRepository.findOne({
      where: {
        idRuta: id
      }
    });
    if(!ruta) throw new NotFoundException(`No se encontró la ruta con id ${id}`);

    await this.rutasRepository.remove(ruta);

    return {
      status: 200,
      message: 'Ruta eliminada correctamente',
    };
  }
}
