import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock/entities/stock.entity';

@Module({
  imports: [StockModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Taolahai1762004@',
      database: 'typeorm_nestjs_tipjs_vid22',
      entities: [Stock],
      synchronize: true,
      subscribers: [],
      migrations: [],
      poolSize: 10,
      connectorPackage: 'mysql2',
      logging: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
