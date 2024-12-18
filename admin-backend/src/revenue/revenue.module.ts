import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { Revenue, RevenueSchema } from './schemas/revenue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Revenue.name, schema: RevenueSchema }])
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {} 