import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { AppDataSource } from '../../data-source';

@Injectable()
export class SeedsCommand {
    constructor(private readonly seedsService: SeedsService) {}

    @Command({
        command: "seed:database",
        describe: "Ejecutar migraciones y poblar la base de datos con datos defecto"
    })
    async run() {
        // Inicializar la conexión a la base de datos
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        console.log('Ejecutando migraciones...');
        await AppDataSource.runMigrations();
        console.log('Migraciones ejecutadas correctamente.');
        
        console.log('Poblando la base de datos con datos defecto...');
        await this.seedsService.seed();
        console.log('Base de datos poblada con éxito!');
    }
}