import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './db/source';
import { WordModule } from './modules/word.module';
import { TranslationModule } from './modules/translation.module';
import { NextModule } from './modules/next.module';
import { UserWordModule } from './modules/userWord.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    WordModule,
    TranslationModule,
    NextModule,
    UserWordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
