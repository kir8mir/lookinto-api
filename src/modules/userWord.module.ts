import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWordEntity } from '../entities/userWord.entity';
import { UserWordController } from '../controllers/userWord.controller';
import { UserWordService } from '../services/userWord.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserWordEntity])],
  controllers: [UserWordController],
  providers: [UserWordService],
  exports: [UserWordService],
})
export class UserWordModule {}
