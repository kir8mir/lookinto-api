import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './db/source';
import { WordModule } from './modules/word.module';
import { TranslationModule } from './modules/translation.module';
import { UserModule } from './modules/user.module';
import { UserWordModule } from './modules/userWord.module';
import { EntryModule } from './modules/entry.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    WordModule,
    TranslationModule,
    UserModule,
    UserWordModule,
    EntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
