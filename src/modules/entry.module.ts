import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { UserWordModule } from './userWord.module';
import { EntryService } from '../services/entry.service';
import { EntryController } from '../controllers/entry.controller';

@Module({
  imports: [UserModule, UserWordModule],
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
