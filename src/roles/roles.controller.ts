import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @Permiso(33)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Permiso(34)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':idRol')
  findOne(@Param('idRol') idRol: number) {
    return this.rolesService.findOne(+idRol);
  }

  @Patch(':idRol')
  @Permiso(35)
  update(@Param('idRol') idRol: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+idRol, updateRoleDto);
  }

  @Patch('/state/:idRol')
  @Permiso(36)
  status(@Param('idRol') idRol: number) {
    return this.rolesService.changeStatus(+idRol);
  }

  @Delete(':idRol')
  @Permiso(37)
  remove(@Param('idRol') idRol: number) {
    return this.rolesService.remove(+idRol);
  }
}
