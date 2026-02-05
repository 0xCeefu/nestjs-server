import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const id = req.user.id;
    return this.authService.login(id);
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('refresh')
  async refreshToken(@Request() req) {
    const id = req.user.id;
    return this.authService.refreshJwtToken(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Request() req) {
    const id = req.user.id;
    await this.authService.logout(id);
    return { message: 'Logged out successfully' };
  }
}
