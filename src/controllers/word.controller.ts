import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WordService } from '../services/word.service';
import { IWordDTO } from '../interfaces/word.interface';

@Controller('word')
export class WordController {
  constructor(protected wordService: WordService) {}

  @Post()
  async create(@Body() body: any) {
    return this.wordService.create(body);
  }

  @Get('')
  async getAll() {
    return this.wordService.getAll();
  }

  @Get(':id')
  async findTest(@Param('id') id: string) {
    return this.wordService.findOneById(+id);
  }
}
