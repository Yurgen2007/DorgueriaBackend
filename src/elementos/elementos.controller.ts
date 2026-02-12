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
  Res,
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
import { Response } from 'express';
import * as XLSX from 'xlsx';

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
      codigoBarras,
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
      codigoBarras,
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
    @Query('codigoBarras') codigoBarras?: string,
    @Query('categoria') categoria?: string,
    @Query('caracteristica') caracteristica?: string,
  ) {
    const filtros = {
      nombre,
      codigoBarras,
      categoria: categoria ? Number(categoria) : undefined,
      caracteristica: caracteristica ? Number(caracteristica) : undefined,
    };
    return this.elementosService.findByInventario(idInventario, filtros);
  }

  // Endpoint para vender (descontar stock)
  @Post(':idElemento/vender')
  @Permiso(72)
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

  // Endpoint para exportar elementos a Excel
  @Get('export/excel')
  @Permiso(19)
  async exportToExcel(@Res() res: Response) {
    const elementos = await this.elementosService.findAll();

    // Transformar datos para Excel (sin imagen, con todas las caracteristicas)
    const data = elementos.map(el => ({
      ID: el.idElemento,
      Nombre: el.nombre,
      Descripcion: el.descripcion || '',
      CodigoBarras: el.codigoBarras || '',
      Stock: el.stock,
      Estado: el.estado ? 'Activo' : 'Inactivo',
      Categoria: el.fkCategoria?.nombre || '',
      UnidadMedida: el.fkUnidadMedida?.nombre || '',
      Caracteristica: el.fkCaracteristica?.nombre || '',
      Sitio: el.fkSitio?.nombre || '',
      Pasillo: el.fkSitio?.pasillo || '',
      Estante: el.fkSitio?.estante || '',
      Inventario: el.fkInventario?.nombre || '',
      FechaVencimiento: el.fechaVencimiento ? new Date(el.fechaVencimiento).toLocaleDateString('es-ES') : '',
      FechaCreacion: el.createdAt ? new Date(el.createdAt).toLocaleDateString('es-ES') : '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Elementos');

    // Aplicar estilo verde a los encabezados
    const headers = Object.keys(data[0] || {});
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    
    // Verde para los encabezados (fila 0)
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      worksheet[cellAddress] = {
        ...worksheet[cellAddress],
        s: {
          fill: { fgColor: { rgb: '4CAF50' } }, // Verde víbido (biché)
          font: { color: { rgb: 'FFFFFF' }, bold: true, name: 'Arial' },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          },
        },
      };
    }

    // Ajustar ancho de columnas
    const colWidths = headers.map(h => ({ wch: Math.max(h.length, 15) }));
    worksheet['!cols'] = colWidths;

    // Generar nombre de archivo con fecha
    const fileName = `elementos_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Generar buffer y enviar como respuesta
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    
    return res.send(buffer);
  }
}
