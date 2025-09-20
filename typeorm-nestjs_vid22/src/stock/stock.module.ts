import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Type } from 'class-transformer';
import { Stock } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [TypeOrmModule.forFeature([Stock])],
})
export class StockModule { }
