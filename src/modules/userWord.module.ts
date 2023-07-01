import { TranslationModule } from './translation.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWordEntity } from '../entities/userWord.entity';
import { UserWordController } from '../controllers/userWord.controller';
import { UserWordService } from '../services/userWord.service';
import { WordModule } from './word.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserWordEntity]),
    WordModule,
    TranslationModule,
  ],
  controllers: [UserWordController],
  providers: [UserWordService],
  exports: [UserWordService],
})
export class UserWordModule {}
