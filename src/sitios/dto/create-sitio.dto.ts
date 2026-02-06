import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSitioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsOptional()
    estante?: string

    @IsString()
    @IsOptional()
    pasillo?: string
}
