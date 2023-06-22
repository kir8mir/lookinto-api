import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextEntity } from '../entities/next.entity';
import { NextController } from '../controllers/next.controller';
import { NextService } from '../services/next.service';

@Module({
  imports: [TypeOrmModule.forFeature([NextEntity])],
  controllers: [NextController],
  providers: [NextService],
  exports: [NextService],
})
export class NextModule {}
