import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateElementoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsBoolean()
  estado: boolean;

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

  @IsString()
  @IsOptional()
  @Matches(/^(\d{8}|\d{12}|\d{13})?$/, {
    message: 'Código de barras inválido. Debe tener 8, 12 o 13 dígitos',
  })
  codigoBarras?: string;

  @IsDateString()
  @IsOptional()
  fechaVencimiento?: string;
}
