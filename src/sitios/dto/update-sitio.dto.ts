import { PartialType } from '@nestjs/mapped-types';
import { CreateSitioDto } from './create-sitio.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSitioDto extends PartialType(CreateSitioDto) {
}
