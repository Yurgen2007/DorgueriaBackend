import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { UpdateElementoDto } from './dto/update-elemento.dto';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) { }

  @Post()
  @Permiso(18)
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/img/elementos',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `elemento-${unique}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const {
      nombre,
      descripcion,
      perecedero,
      noPerecedero,
      estado,
      fechaVencimiento,
      fkCategoria,
      fkUnidadMedida,
      fkCaracteristica,
      fkSitio,
      fkInventario,
      stock,
    } = body;

    const parsedDto: CreateElementoDto = {
      nombre,
      descripcion,
      estado: estado === 'true' || estado === true,
      fkCategoria: Number(fkCategoria),
      fkUnidadMedida: Number(fkUnidadMedida),
      fkCaracteristica: fkCaracteristica ? Number(fkCaracteristica) : undefined,
      fkSitio: Number(fkSitio),
      fkInventario: Number(fkInventario),
      fechaVencimiento,
      stock: stock ? Number(stock) : 0,
    };

    return this.elementosService.create(parsedDto, file?.filename);
  }


  @Get()
  @Permiso(19)
  findAll() {
    return this.elementosService.findAll();
  }

  // Endpoint para filtros avanzados por características
  @Get('buscar')
  @Permiso(19)
  buscar(
    @Query('nombre') nombre?: string,
    @Query('categoria') categoria?: string,
    @Query('caracteristica') caracteristica?: string,
    @Query('perecedero') perecedero?: string,
    @Query('noPerecedero') noPerecedero?: string,
  ) {
    const filtros = {
      nombre,
      categoria: categoria ? Number(categoria) : undefined,
      caracteristica: caracteristica ? Number(caracteristica) : undefined,
      perecedero: perecedero === 'true' || perecedero === 'true',
      noPerecedero: noPerecedero === 'true' || noPerecedero === 'true',
    };
    return this.elementosService.buscarAvanzado(filtros);
  }

  @Get(':idElemento')
  findOne(@Param('idElemento') idElemento: number) {
    return this.elementosService.findOne(+idElemento);
  }

  @Patch(':idElemento')
  @Permiso(20)
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/img/elementos',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `elemento-${unique}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('idElemento') idElemento: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateElementoDto: UpdateElementoDto,
  ) {
    if (file) {
      updateElementoDto.imagen = file.filename;
    }
    return this.elementosService.update(+idElemento, updateElementoDto);
  }

  // Obtener elementos por inventario con filtros opcionales
  @Get('inventario/:idInventario')
  @Permiso(19)
  findByInventario(
    @Param('idInventario', ParseIntPipe) idInventario: number,
    @Query('nombre') nombre?: string,
    @Query('categoria') categoria?: string,
    @Query('caracteristica') caracteristica?: string,
  ) {
    const filtros = {
      nombre,
      categoria: categoria ? Number(categoria) : undefined,
      caracteristica: caracteristica ? Number(caracteristica) : undefined,
    };
    return this.elementosService.findByInventario(idInventario, filtros);
  }

  // Endpoint para vender (descontar stock)
  @Post(':idElemento/vender')
  @Permiso(20)
  vender(
    @Param('idElemento', ParseIntPipe) idElemento: number,
    @Body('cantidad', ParseIntPipe) cantidad: number = 1,
  ) {
    return this.elementosService.venderElemento(idElemento, cantidad);
  }

  @Patch('state/:idElemento')
  @Permiso(21)
  status(@Param('idElemento') idElemento: number) {
    return this.elementosService.changeStatus(+idElemento);
  }

  @Delete(':idElemento')
  @Permiso(22)
  remove(@Param('idElemento') idElemento: number) {
    return this.elementosService.remove(+idElemento);
  }
}
