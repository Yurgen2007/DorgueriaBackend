import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateElementoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  imagen: string;

  @IsNumber()
  @IsOptional()
  fkCategoria: number;

  @IsNumber()
  @IsOptional()
  fkUnidadMedida: number;

  @IsNumber()
  @IsOptional()
  fkCaracteristica?: number;

  @IsNumber()
  @IsOptional()
  fkSitio: number;

  @IsNumber()
  @IsOptional()
  fkInventario?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;
}
