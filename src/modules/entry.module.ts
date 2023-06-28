import { Module } from '@nestjs/common';

import { WordService } from '../services/word.service';
import { UserModule } from './user.module';
import { UserWordModule } from './userWord.module';

@Module({
  imports: [UserModule, UserWordModule],
  controllers: [],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
