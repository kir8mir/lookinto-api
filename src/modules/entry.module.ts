import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { UserWordModule } from './userWord.module';
import { EntryService } from '../services/entry.service';
import { EntryController } from '../controllers/entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
