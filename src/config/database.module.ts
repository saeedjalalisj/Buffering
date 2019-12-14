import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from './env.module';
import { EnvService } from './env.service';
import { User } from '../users/users.entity';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();
  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [User],
    synchronize: false,
  });
}

@Global()
@Module({
  imports: [
    EnvModule,
    DatabaseOrmModule(),
  ],
})
export class DatabaseModule { }
