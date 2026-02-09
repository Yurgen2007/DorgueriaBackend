import { IsBoolean, IsNumber, IsOptional, IsString, Min, Matches } from "class-validator";

export class CreateElementoDto {

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  estado: boolean;

  @IsNumber()
  fkCategoria: number;

  @IsNumber()
  fkUnidadMedida: number;

  @IsNumber()
  @IsOptional()
  fkCaracteristica?: number;

  @IsString()
  @IsOptional()
  fechaVencimiento?: string;

  @IsString()
  @Matches(/^(\d{8}|\d{12}|\d{13})$/, {
    message: 'Código de barras inválido. Debe tener 8, 12 o 13 dígitos',
  })
  codigoBarras: string;

  @IsNumber()
  fkSitio: number;

  @IsNumber()
  fkInventario: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}
