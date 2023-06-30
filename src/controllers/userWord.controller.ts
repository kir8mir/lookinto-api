import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserWordService } from '../services/userWord.service';

@Controller('userword')
export class UserWordController {
  constructor(protected userWordService: UserWordService) {}

  @Post()
  async addWordToNext(@Body() body: any) {
    return this.userWordService.create(body);
  }

  @Get('')
  async getAll() {
    return this.userWordService.getAll();
  }

  @Get('/new/:id')
  async getAllNew(@Param('id') id: string) {
    return this.userWordService.getAllNew(id);
  }

  @Delete(':id')
  async removeWordFromNext(@Param('id') id: string, @Body() body: any) {
    return this.userWordService.remove(+id, body);
  }
}
