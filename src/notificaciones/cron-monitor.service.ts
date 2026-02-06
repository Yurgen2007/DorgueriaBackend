import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificacionesService } from './notificaciones.service';

@Injectable()
export class CronMonitorService {
    constructor(
        private readonly notificacionesService: NotificacionesService,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        console.log('Ejecutando verificación diaria de inventarios (desde CronMonitorService)...');
        await this.notificacionesService.verificarInventariosYNotificar();
    }
}
