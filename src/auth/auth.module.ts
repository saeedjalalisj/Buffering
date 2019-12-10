import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
