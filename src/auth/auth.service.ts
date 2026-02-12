import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/auth/email/email.service';
import { groupBy } from "lodash";
import { MailConfigDto } from './dto/mail-config.dto';



@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>,
        private emailService: EmailService

    ) { }

    async login(data: LoginDto) {
        const user = await this.usuarioRepository.findOne({
            where: {
                documento: data.documento
            },
            relations: ["fkRol"]
        });
        if (!user) throw new HttpException({ status: 404, message: "Usuario no existe" }, HttpStatus.NOT_FOUND)

        const verified = await bcrypt.compare(data.password, user.password);
        if (!verified) throw new HttpException({ status: 401, message: "Contraseña incorrecta" }, HttpStatus.UNAUTHORIZED);

        const token = jwt.sign({
            idUsuario: user.idUsuario,
            fkRol: user.fkRol?.idRol ?? undefined
        }, this.configService.get("SECRET"), {
            expiresIn: this.configService.get("EXPIRES") ?? "96h"
        });

        const flatData = await this.usuarioRepository
            .createQueryBuilder("usuario")
            .leftJoin("usuario.fkRol", "rol")
            .leftJoin("rol.rolPermisos", "rolPermiso")
            .leftJoin("rolPermiso.fkPermiso", "permiso")
            .leftJoin("permiso.fkRuta", "ruta")
            .leftJoin("ruta.fkModulo", "modulo")
            .select([
                "modulo.idModulo",
                "modulo.nombre",
                "modulo.icono",
                "modulo.href",
                "ruta.idRuta",
                "ruta.nombre",
                "ruta.href",
                "ruta.icono",
                "ruta.listed",
                "permiso.idPermiso"
            ])
            .where("usuario.idUsuario = :userId", { userId: user.idUsuario })
            .andWhere("rolPermiso.estado = true")
            .andWhere("ruta.estado = true")
            .andWhere("modulo.estado = true")
            .andWhere("rol.estado = true")
            .getRawMany();

        // Group and transform
        const grouped = Object.values(
            flatData.reduce((acc, row) => {
                const moduloId = row.modulo_id_modulo;

                if (!acc[moduloId]) {
                    acc[moduloId] = {
                        id: moduloId,
                        nombre: row.modulo_nombre,
                        icono: row.modulo_icono,
                        href: row.modulo_href,
                        rutas: [],
                    };
                }

                const routeId = row.ruta_id_ruta;

                // Busca si ya existe la ruta
                let ruta = acc[moduloId].rutas.find(r => r.id === routeId);

                if (!ruta) {
                    ruta = {
                        id: routeId,
                        nombre: row.ruta_nombre,
                        href: row.ruta_href,
                        icono: row.ruta_icono,
                        listed: row.ruta_listed,
                        permisos: []
                    };
                    acc[moduloId].rutas.push(ruta);
                }

                ruta.permisos.push(row.permiso_id_permiso);

                return acc;
            }, {} as Record<number, any>)
        );

        return { status: 200, response: "Successfully logged in", access_token: token, modules: grouped }
    }

    async refetch(idUsuario: number) {
        const flatData = await this.usuarioRepository
            .createQueryBuilder("usuario")
            .leftJoin("usuario.fkRol", "rol")
            .leftJoin("rol.rolPermisos", "rolPermiso")
            .leftJoin("rolPermiso.fkPermiso", "permiso")
            .leftJoin("permiso.fkRuta", "ruta")
            .leftJoin("ruta.fkModulo", "modulo")
            .select([
                "modulo.idModulo",
                "modulo.nombre",
                "modulo.icono",
                "modulo.href",
                "ruta.idRuta",
                "ruta.nombre",
                "ruta.href",
                "ruta.icono",
                "ruta.listed",
                "permiso.idPermiso"
            ])
            .where("usuario.idUsuario = :userId", { userId: idUsuario })
            .andWhere("rolPermiso.estado = true")
            .andWhere("ruta.estado = true")
            .andWhere("modulo.estado = true")
            .andWhere("rol.estado = true")
            .getRawMany();

        // Group and transform
        const grouped = Object.values(
            flatData.reduce((acc, row) => {
                const moduloId = row.modulo_id_modulo;

                if (!acc[moduloId]) {
                    acc[moduloId] = {
                        id: moduloId,
                        nombre: row.modulo_nombre,
                        icono: row.modulo_icono,
                        href: row.modulo_href,
                        rutas: [],
                    };
                }

                const routeId = row.ruta_id_ruta;

                // Busca si ya existe la ruta
                let ruta = acc[moduloId].rutas.find(r => r.id === routeId);

                if (!ruta) {
                    ruta = {
                        id: routeId,
                        nombre: row.ruta_nombre,
                        href: row.ruta_href,
                        icono: row.ruta_icono,
                        listed: row.ruta_listed,
                        permisos: []
                    };
                    acc[moduloId].rutas.push(ruta);
                }

                ruta.permisos.push(row.permiso_id_permiso);

                return acc;
            }, {} as Record<number, any>)
        );
        return { status: 200, message: "Permisos obtenidos correctamente", modules: grouped }
    }


    async forgotPassword(correo: string) {
        const user = await this.usuarioRepository.findOneBy({ correo })

        if (!user) {
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        // Usar las credenciales del usuario o las del .env como fallback
        const serviceMail = user.serviceMail || this.configService.get("SERVICE_MAIL");
        const mailUser = user.mailUser || this.configService.get("MAIL_USER");
        const mailPassword = user.mailPassword || this.configService.get("MAIL_PASSWORD");

        if (!serviceMail || !mailUser || !mailPassword) {
            throw new HttpException(`Faltan credenciales de correo. Por favor configure las credenciales en la sección de configuración de correo.`, HttpStatus.BAD_REQUEST)
        }

        this.emailService.sendResetPasswordLink(correo, { serviceMail, mailUser, mailPassword });

        return { status: 200, message: "Revisa tu correo" }
    }


    async resetPassword(token: string, password: string, confirmPassword: string) {

        if (password !== confirmPassword) {
            throw new HttpException(
                'Las contraseñas no coinciden',
                HttpStatus.BAD_REQUEST,
            );
        }

        const correo = await this.emailService.decodeConfirmationToken(token);



        const rounds = 10;
        const newPassword = await bcrypt.hash(password, rounds)

        const user = await this.usuarioRepository.findOneBy({ correo })

        if (!user) {
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        user.password = newPassword;
        await this.usuarioRepository.save(user);

        return { status: 200, message: "Contraseña actualizada correctamente" }
    }

    async updateMailConfig(idUsuario: number, mailConfig: MailConfigDto) {
        const user = await this.usuarioRepository.findOneBy({ idUsuario });

        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        user.serviceMail = mailConfig.serviceMail;
        user.mailUser = mailConfig.mailUser;
        user.mailPassword = mailConfig.mailPassword;

        await this.usuarioRepository.save(user);

        return { status: 200, message: "Configuración de correo actualizada correctamente" };
    }

    async getMailConfig(idUsuario: number) {
        const user = await this.usuarioRepository.findOneBy({ idUsuario });

        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        return {
            status: 200,
            data: {
                serviceMail: user.serviceMail,
                mailUser: user.mailUser,
                // No retornamos la contraseña por seguridad
            }
        };
    }

}
