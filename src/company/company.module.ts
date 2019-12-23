import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';

@Module({
  providers: [CompanyService],
})
export class CompanyModule {}
