import {Controller, Request, Get, Post, UseGuards, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersDto } from '../users/dto/users.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() userDto: UsersDto) {
    return this.authService.register(userDto);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDto: UsersDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
