import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { NextService } from '../services/next.service';

@Controller('next')
export class NextController {
  constructor(protected wordService: NextService) {}

  @Post()
  async addWordToNext(@Body() body: any) {
    return this.wordService.create(body);
  }

  @Get('')
  async getAll() {
    return this.wordService.getAll();
  }

  @Delete(':id')
  async removeWordFromNext(@Param('id') id: string, @Body() body: any) {
    return this.wordService.remove(+id, body);
  }
}
