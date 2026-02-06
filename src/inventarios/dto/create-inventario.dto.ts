import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInventarioDto {
    @IsString()
    nombre: string

    @IsBoolean()
    @IsOptional()
    estado?: boolean
}
