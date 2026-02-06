import { IsString, MinLength } from "class-validator";

export class CreateCaracteristicaDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(2)
    nombre: string;
}
