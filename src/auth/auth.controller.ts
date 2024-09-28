import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginData.username, loginData.password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }
}