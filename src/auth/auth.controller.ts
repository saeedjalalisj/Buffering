import {Controller, Request, Get, Post, UseGuards, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersDto } from '../users/dto/users.dto';
import { RolesGuard } from '../role/role.guard';
import {Roles} from '../role/roles.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() userDto: UsersDto) {
    return this.authService.register(userDto);
  }

  @Post('auth/login')
  async login(@Body() userDto: UsersDto) {
    return this.authService.login(userDto);
  }

  // todo: todo remove simple test after finish this feature
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
