import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from 'jsonwebtoken';
import { Usuarios } from "../../usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import { mailBody } from "./mail.body";


@Injectable()

export class EmailService {
    private nodemailerTransport: Transporter;

    private readonly logger = new Logger(EmailService.name);

    constructor(

        private readonly configService: ConfigService,
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>
    ) {
        this.nodemailerTransport = createTransport({
            service: this.configService.get<string>('SERVICE_MAIL'), //gmail, hotmail y asi
            auth: {
                user: configService.get('MAIL_USER'),//quien envia
                pass: configService.get('MAIL_PASSWORD')
            }
        })
    }


    public async sendMail(options: SendMailOptions) {
        this.logger.log('Email sent out to', options.to);
        return this.nodemailerTransport.sendMail(options);
    }


    async sendResetPasswordLink(correo: string): Promise<void> {

        const user = this.usuarioRepository.findOne({
            where: { correo }
        });

        if (!user) {
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        const payload = { correo };

        const token = jwt.sign(payload, this.configService.get("SECRET"), {
            expiresIn: this.configService.get("EXPIRES") ?? "1h"
        });

        const url = `${this.configService.get("BASE_URL")}/reset-password?token=${token}`;

        const html = mailBody(url);



        return this.sendMail({
            to: correo,
            subject: 'Reset password',
            html,

        });

    }

    async decodeConfirmationToken(token: string) {
        try {
            const payload = await jwt.verify(token, this.configService.get('SECRET'));

            if (typeof payload === 'object' && 'correo' in payload) {
                return payload.correo;
            }

            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException(
                    'Email confirmation token expired'
                );
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }
}