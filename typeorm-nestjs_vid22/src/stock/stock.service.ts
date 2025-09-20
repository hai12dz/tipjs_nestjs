import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { EntityManager, In, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {

  @InjectEntityManager() private entityManager: EntityManager;
  @InjectRepository(Stock) private stockRepository: Repository<Stock>;

  create(createStockDto: CreateStockDto) {

    // return this.entityManager.save(Stock, createStockDto);
    return this.stockRepository.save(createStockDto);
  }

  findAll() {
    // return this.entityManager.find(Stock);
    return this.stockRepository.find();
  }

  findOne(id: number) {
    return this.entityManager.findOne(Stock, { where: { id: In([id]) } });
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return this.entityManager.update(Stock, id, updateStockDto);
  }

  remove(id: number) {
    return this.entityManager.delete(Stock, id);
  }
}
