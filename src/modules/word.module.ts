import { WordEntity } from './../entities/word.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordController } from '../controllers/word.controller';
import { WordService } from '../services/word.service';
import { TranslationModule } from './translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
