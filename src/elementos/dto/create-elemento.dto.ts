import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";

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

  @IsNumber()
  fkSitio: number;

  @IsNumber()
  fkInventario: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}
