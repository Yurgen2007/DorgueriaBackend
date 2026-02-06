import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermiso } from 'src/rol-permiso/entities/rol-permiso.entity';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class PermisoGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    @InjectRepository(RolPermiso)
    private rolPermisoRepository: Repository<RolPermiso>
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const fkPermiso = this.reflector.get<number>("permiso", context.getHandler());
    if (!fkPermiso) return true
    const { user: { fkRol } } = context.switchToHttp().getRequest();

    if (fkRol === Role.ADMIN) return true; // ⚠️ Admin Bypass

    if (!fkRol) throw new HttpException("No tienes un rol asignado", HttpStatus.FORBIDDEN);

    const permiso = await this.rolPermisoRepository.findOne({
      where: {
        fkPermiso: {
          idPermiso: fkPermiso
        },
        fkRol: {
          idRol: fkRol
        },
        estado: true
      }
    })

    if (!permiso) throw new HttpException("No tienes permiso para realizar esta acción", HttpStatus.FORBIDDEN);

    return true;
  }
}
