import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from '../entities/translation.entity';
import { TranslationController } from '../controllers/translation.controller';
import { TranslationService } from '../services/translation.service';
import { WordModule } from './word.module';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationEntity])],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
