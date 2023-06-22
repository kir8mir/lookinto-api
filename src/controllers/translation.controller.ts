import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TranslationService } from '../services/translation.service';

@Controller('translation')
export class TranslationController {
  constructor(protected translationService: TranslationService) {}

  @Post()
  async create(@Body() body: any) {
    return this.translationService.create(body);
  }

  @Get('')
  async getAll() {
    return this.translationService.getAll();
  }

  @Get(':id')
  async findTest(@Param('id') id: string) {
    return this.translationService.findOneById(+id);
  }

  @Get('word/:id')
  async findTranslation(@Param('id') id: string) {
    return this.translationService.getAllTranslationsForWord(+id);
  }
}
