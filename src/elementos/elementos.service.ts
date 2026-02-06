import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { Elementos } from './entities/elemento.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { AgregarStockDto } from 'src/inventarios/dto';

@Injectable()
export class ElementosService {
  constructor(
    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,

    @InjectRepository(CodigoInventario)
    private readonly codigosRepository: Repository<CodigoInventario>,

    private readonly notificacionesService: NotificacionesService,
  ) { }

  async create(
    createElementoDto: CreateElementoDto,
    filename?: string,
  ): Promise<Elementos> {
    console.log('Datos recibidos en el backend:', {
      ...createElementoDto,
      imagen: filename ?? 'defaultElemento.png',
    });

    // Validar que los campos requeridos sean números válidos
    if (!createElementoDto.fkCategoria || isNaN(Number(createElementoDto.fkCategoria))) {
      throw new BadRequestException('La categoría es requerida y debe ser un número válido');
    }
    if (!createElementoDto.fkUnidadMedida || isNaN(Number(createElementoDto.fkUnidadMedida))) {
      throw new BadRequestException('La unidad de medida es requerida y debe ser un número válido');
    }
    if (!createElementoDto.fkSitio || isNaN(Number(createElementoDto.fkSitio))) {
      throw new BadRequestException('El sitio es requerido y debe ser un número válido');
    }
    if (!createElementoDto.fkInventario || isNaN(Number(createElementoDto.fkInventario))) {
      throw new BadRequestException('El inventario es requerido y debe ser un número válido');
    }

    const elemento = this.elementoRepository.create({
      ...createElementoDto,
      imagen: filename ?? 'defaultElemento.png',
      fkCategoria: { idCategoria: Number(createElementoDto.fkCategoria) },
      fkUnidadMedida: { idUnidad: Number(createElementoDto.fkUnidadMedida) },
      fkCaracteristica: createElementoDto.fkCaracteristica
        ? { idCaracteristica: Number(createElementoDto.fkCaracteristica) }
        : undefined,
      fkSitio: { idSitio: Number(createElementoDto.fkSitio) },
      fkInventario: { idInventario: Number(createElementoDto.fkInventario) },
      stock: createElementoDto.stock ?? 0,
    });

    const nuevoElemento = await this.elementoRepository.save(elemento);

    return nuevoElemento;
  }

  async findAll(): Promise<Elementos[]> {
    return await this.elementoRepository.find({
      relations: ['fkUnidadMedida', 'fkCategoria', 'fkCaracteristica', 'fkSitio', 'fkInventario'],
    });
  }

  async findOne(idElemento: number): Promise<Elementos | null> {
    const getElementoById = await this.elementoRepository.findOne({
      where: { idElemento },
      relations: ['fkUnidadMedida', 'fkCategoria', 'fkCaracteristica', 'fkSitio', 'fkInventario', 'codigos'],
    });

    if (!getElementoById) {
      throw new Error(
        `No se encontro el elemento, el id ${idElemento} no existe`,
      );
    }

    return getElementoById;
  }

  async update(idElemento: number, updateElementoDto: UpdateElementoDto) {
    const getElementoById = await this.elementoRepository.findOne({
      where: { idElemento },
    });

    if (!getElementoById) {
      throw new Error(
        `No se encontró el elemento, el id ${idElemento} no existe`,
      );
    }

    await this.elementoRepository.update(idElemento, {
      nombre: updateElementoDto.nombre,
      descripcion: updateElementoDto.descripcion,
      imagen: updateElementoDto.imagen,
      stock: updateElementoDto.stock,
      fkCategoria: updateElementoDto.fkCategoria ? { idCategoria: updateElementoDto.fkCategoria } : undefined,
      fkUnidadMedida: updateElementoDto.fkUnidadMedida ? { idUnidad: updateElementoDto.fkUnidadMedida } : undefined,
      fkCaracteristica: updateElementoDto.fkCaracteristica ? { idCaracteristica: updateElementoDto.fkCaracteristica } : undefined,
      fkSitio: updateElementoDto.fkSitio ? { idSitio: updateElementoDto.fkSitio } : undefined,
      fkInventario: updateElementoDto.fkInventario ? { idInventario: updateElementoDto.fkInventario } : undefined,
    });

    return { status: 200, message: 'Datoactualizados con exito' };
  }

  async agregateStock(agregateStock: AgregarStockDto) {
    const elemento = await this.elementoRepository.findOne({
      where: { idElemento: agregateStock.fkElemento },
      relations: ['fkCaracteristica', 'fkSitio'],
    });

    if (!elemento) {
      throw new NotFoundException('Elemento no encontrado');
    }

    if (!elemento.estado) {
      throw new BadRequestException(
        'El elemento está inactivo. Actívelo para agregar stock.',
      );
    }

    if (elemento.fkCaracteristica) {
      if (!agregateStock.codigos || agregateStock.codigos.length === 0) {
        throw new BadRequestException('Este elemento requiere códigos para agregar stock');
      }

      for (const codigo of agregateStock.codigos) {
        const existe = await this.codigosRepository.findOneBy({ codigo });
        if (existe) {
          throw new BadRequestException(
            `El código '${codigo}' ya está registrado`,
          );
        }

        await this.codigosRepository.save({
          codigo,
          fkElemento: elemento,
        });
      }

      elemento.stock += agregateStock.codigos.length;
    } else {
      if (!agregateStock.stock || agregateStock.stock <= 0) {
        throw new BadRequestException('La cantidad de stock debe ser mayor a 0');
      }
      elemento.stock += agregateStock.stock;
    }

    await this.elementoRepository.save(elemento);

    // await this.notificacionesService.notificarStockBajo(elemento); // Needs update to support Elemento

    return { message: 'Stock actualizado correctamente' };
  }

  async getCodigosParaDevolucion(idElemento: number): Promise<CodigoInventario[]> {
    const elemento = await this.elementoRepository.findOne({
      where: { idElemento },
      relations: [
        'codigos',
      ],
    });

    if (!elemento) throw new NotFoundException('Elemento no encontrado');

    return elemento.codigos || [];
  }

  async changeStatus(idElemento: number) {
    const getElementoById = await this.elementoRepository.findOneBy({
      idElemento,
    });

    if (!getElementoById) {
      throw new Error(
        `No se encontro el elemento, el id ${idElemento} no existe`,
      );
    }

    getElementoById.estado = !getElementoById.estado;

    return await this.elementoRepository.save(getElementoById);
  }

  // Método para buscar elementos por múltiples características
  async buscarAvanzado(filtros: {
    nombre?: string;
    categoria?: number;
    caracteristica?: number;
    perecedero?: boolean;
    noPerecedero?: boolean;
  }) {
    const query = this.elementoRepository
      .createQueryBuilder('elemento')
      .leftJoinAndSelect('elemento.fkCategoria', 'categoria')
      .leftJoinAndSelect('elemento.fkCaracteristica', 'caracteristica')
      .leftJoinAndSelect('elemento.fkUnidadMedida', 'unidadMedida')
      .leftJoinAndSelect('elemento.inventarios', 'inventario');

    // Filtrar por nombre (búsqueda parcial)
    if (filtros.nombre) {
      query.andWhere('elemento.nombre ILIKE :nombre', {
        nombre: `%${filtros.nombre}%`,
      });
    }

    // Filtrar por categoría
    if (filtros.categoria) {
      query.andWhere('categoria.idCategoria = :categoria', {
        categoria: filtros.categoria,
      });
    }

    // Filtrar por característica
    if (filtros.caracteristica) {
      query.andWhere('caracteristica.idCaracteristica = :caracteristica', {
        caracteristica: filtros.caracteristica,
      });
    }

    // Filtrar por perecedero
    if (filtros.perecedero !== undefined) {
      query.andWhere('elemento.perecedero = :perecedero', {
        perecedero: filtros.perecedero,
      });
    }

    // Filtrar por no perecedero
    if (filtros.noPerecedero !== undefined) {
      query.andWhere('elemento.noPerecedero = :noPerecedero', {
        noPerecedero: filtros.noPerecedero,
      });
    }


    return query.getMany();
  }

  async findByInventario(
    idInventario: number,
    filtros?: {
      nombre?: string;
      categoria?: number;
      caracteristica?: number;
    },
  ): Promise<Elementos[]> {
    const query = this.elementoRepository
      .createQueryBuilder('elemento')
      .select(['elemento'])
      .leftJoinAndSelect('elemento.fkCategoria', 'categoria')
      .leftJoinAndSelect('elemento.fkCaracteristica', 'caracteristica')
      .leftJoinAndSelect('elemento.fkUnidadMedida', 'unidadMedida')
      .leftJoinAndSelect('elemento.fkSitio', 'sitio')
      .leftJoinAndSelect('elemento.fkInventario', 'inventario')
      .where('inventario.idInventario = :idInventario', { idInventario });

    if (filtros?.nombre) {
      query.andWhere('elemento.nombre ILIKE :nombre', {
        nombre: `%${filtros.nombre}%`,
      });
    }

    if (filtros?.categoria) {
      query.andWhere('categoria.idCategoria = :categoria', {
        categoria: filtros.categoria,
      });
    }

    if (filtros?.caracteristica) {
      query.andWhere('caracteristica.idCaracteristica = :caracteristica', {
        caracteristica: filtros.caracteristica,
      });
    }

    return query.getMany();
  }

  async venderElemento(idElemento: number, cantidad: number) {
    const elemento = await this.elementoRepository.findOne({
      where: { idElemento },
      relations: ['fkInventario', 'fkCategoria'],
    });

    if (!elemento) {
      throw new NotFoundException('Elemento no encontrado');
    }

    if (!elemento.estado) {
      throw new BadRequestException('El elemento está inactivo');
    }

    if (elemento.stock < cantidad) {
      throw new BadRequestException(
        `Stock insuficiente. Disponible: ${elemento.stock}, Solicitado: ${cantidad}`,
      );
    }

    elemento.stock -= cantidad;
    await this.elementoRepository.save(elemento);

    return {
      message: 'Venta realizada exitosamente',
      stockRestante: elemento.stock,
    };
  }

  async remove(idElemento: number) {
    const elemento = await this.elementoRepository.findOne({
      where: { idElemento },
      relations: ['codigos'],
    });

    if (!elemento) {
      throw new NotFoundException(`No se encontró el elemento con id ${idElemento}`);
    }

    // Eliminar códigos asociados primero
    if (elemento.codigos && elemento.codigos.length > 0) {
      await this.codigosRepository.remove(elemento.codigos);
    }

    await this.elementoRepository.remove(elemento);

    return {
      status: 200,
      message: 'Elemento eliminado correctamente',
    };
  }
}
