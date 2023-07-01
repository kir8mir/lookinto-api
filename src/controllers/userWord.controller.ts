import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserWordService } from '../services/userWord.service';

@Controller('userword')
export class UserWordController {
  constructor(protected userWordService: UserWordService) {}

  @Post()
  async create(@Body() body: any) {
    return this.userWordService.create(body);
  }

  @Post('/change/status')
  async changeStatusImmediately(@Body() body: any) {
    return this.userWordService.changeWordStatusImmediately(body);
  }

  @Post('/new/:id')
  async addNewWord(@Body() body: any, @Param('id') id: string) {
    return this.userWordService.addNewWord(id, body);
  }

  @Get('')
  async getAll() {
    return this.userWordService.getAll();
  }

  @Get('/new/:id')
  async getAllNew(@Param('id') id: string) {
    return this.userWordService.getAllNew(id);
  }

  @Get('/familiar/:id')
  async getAllFamiliar(@Param('id') id: string) {
    return this.userWordService.getAllFamiliar(id);
  }

  @Get('/forgotten/:id')
  async getAllForgotten(@Param('id') id: string) {
    return this.userWordService.getAllForgotten(id);
  }

  @Delete(':id')
  async removeWordFromNext(@Param('id') id: string, @Body() body: any) {
    return this.userWordService.remove(+id, body);
  }
}
