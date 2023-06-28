import { Module } from '@nestjs/common';

import { EntryService } from '../services/entry.service';
import { EntryController } from '../controllers/entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserWordEntity } from '../entities/userWord.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([UserWordEntity]),
  ],
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
