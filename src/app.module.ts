import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, RoleModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
