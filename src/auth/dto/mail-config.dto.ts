import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MailConfigDto {
    @IsNotEmpty()
    @IsString()
    serviceMail: string;

    @IsNotEmpty()
    @IsEmail()
    mailUser: string;

    @IsNotEmpty()
    @IsString()
    mailPassword: string;
}
