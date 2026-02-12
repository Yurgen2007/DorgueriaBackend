import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsInt()
  @IsPositive()
  @Min(6)
  documento: number;

  @IsString({ message: 'El nombre debe ser un string' })
  @MinLength(5)
  nombre: string;

  @IsString({ message: 'El apellido debe ser un string' })
  @MinLength(5)
  apellido: string;

  @IsNumber()
  edad: number;

  @IsString()
  @MinLength(10)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsBoolean()
  estado: boolean;

  @IsString()
  @MinLength(3)
  cargo: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(20)
  @IsOptional()
  perfil: string;

  @IsNumber()
  fkRol: number;

  @IsString()
  @IsOptional()
  serviceMail: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  mailUser: string;

  @IsString()
  @IsOptional()
  mailPassword: string;
}
