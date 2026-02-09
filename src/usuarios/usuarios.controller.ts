import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,  UploadedFile, UseInterceptors, Req, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { diskStorage } from 'multer';
import { fileName } from 'typeorm-model-generator/dist/src/NamingStrategy';
import { extname } from 'path';
import { Request } from 'express';
import { UpdatePerfilDto } from './dto/update-perfil.dto';


@UseGuards(JwtGuard, PermisoGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Permiso(1)
  @UseInterceptors(FileInterceptor('perfil', {
    storage: diskStorage({
      destination: './public/perfiles',
      filename: (req, file, cb) => {
        const nombre = req.body.nombre?.toLowerCase().replace(/\s+/g, '-'); // limpia espacios
        const ext = extname(file.originalname);
        const filename = `perfil-${nombre || 'sin-nombre'}${ext}`;
        cb(null, filename);
      },
    }),
  }))

  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() newUser: CreateUsuarioDto) {
    return this.usuariosService.create(newUser, file?.filename);
  }

  @Post("/massive")
  @Permiso(2)
  @UseInterceptors(FileInterceptor("excel"))
  async massiveUpload(@UploadedFile() file: Express.Multer.File) {
    return this.usuariosService.massiveUpload(file);
  }

  @Get()
  @Permiso(3)
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('perfil')
  getPerfil(@Req() req){
    const user = req.user;
    const id = user.idUsuario;
    return this.usuariosService.getPerfil(id);
  }

  @Patch('updatefoto')
  @UseInterceptors(FileInterceptor('perfil', {
    storage: diskStorage({
      destination: './public/img/perfiles',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const filename = `${Date.now()}-${Math.floor(Math.random()*(100))}-${ext}`;
        cb(null, filename);
      },
    }),
  }))

  async updatePhoto ( @UploadedFile() perfil: Express.Multer.File, @Req() req ){
    if(!perfil) throw new BadRequestException('No se proporcionó ningún archivo');
    const userId = req.user.idUsuario;
    return await this.usuariosService.updateProfilePhoto(userId,perfil.filename)
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.usuariosService.findOne(nombre);
  }

  
  @Patch('update/:id')
  @Permiso(4)
  update(@Param('id') idUsuario: string, @Body() updateUsuario: UpdateUsuarioDto) {
    return this.usuariosService.update(+idUsuario, updateUsuario);
  }

  @Patch('estado/:id')
  @Permiso(5)
  updatestate(@Param('id') id: string) {
    return this.usuariosService.updatestate(+id);
  }

  @Patch('perfil')
  updatePerfilInfo(@Body() updatePerfil : UpdatePerfilDto, @Req() req: any){
    const userId = req.user.idUsuario;
    return this.usuariosService.updatePerfil(userId,updatePerfil)
  }
}
