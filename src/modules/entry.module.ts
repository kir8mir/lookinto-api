import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { UserWordModule } from './userWord.module';
import { EntryService } from '../services/entry.service';

@Module({
  imports: [UserModule, UserWordModule],
  controllers: [],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
