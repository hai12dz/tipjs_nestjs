import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../db/db.module';
import { MyLogger } from '../../logger/my.logger';

@Module({
  imports: [DbModule.register({ path: 'user.json' })],
  controllers: [UserController],
  providers: [UserService, MyLogger],
})
export class UserModule { }
