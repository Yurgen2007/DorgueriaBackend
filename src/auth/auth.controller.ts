import { Body, Controller, Get, Post, Query, Request, Res, UseGuards, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { JwtGuard } from './guards/jwt.guard';
import { MailConfigDto } from './dto/mail-config.dto';
import { Permiso } from './decorators/permiso.decorator';
import { PermisoGuard } from './guards/permiso.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    login(@Body() data: LoginDto){
        return this.authService.login(data);
    }

    @Post("forgot-password")
    forgotPassword(@Body() {correo}: forgotPasswordDto) {
        return this.authService.forgotPassword(correo);
    }

    @Get("refetch")
    @UseGuards(JwtGuard)
    refetch(@Request() req){
        const user = req.user;
        return this.authService.refetch(user.idUsuario);
    }

    @Post("reset-password")
    async resetPassword(
        @Body() {password} : resetPasswordDto,
        @Body() {confirmPassword} : resetPasswordDto,
        @Query('token') token : string
    ) {
        return this.authService.resetPassword(token,password,confirmPassword);
    }

    @Patch("mail-config")
    @UseGuards(JwtGuard, PermisoGuard)
    @Permiso(1) // Permiso para configurar correo
    updateMailConfig(@Request() req, @Body() mailConfig: MailConfigDto) {
        return this.authService.updateMailConfig(req.user.idUsuario, mailConfig);
    }

    @Get("mail-config")
    @UseGuards(JwtGuard)
    getMailConfig(@Request() req) {
        return this.authService.getMailConfig(req.user.idUsuario);
    }
}
