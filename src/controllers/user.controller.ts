import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(protected userService: UserService) {}

  @Post()
  async addWordToNext(@Body() body: any) {
    return this.userService.create(body);
  }

  @Get('')
  async getAll() {
    return this.userService.getAll();
  }

  // @Delete(':id')
  // async removeWordFromNext(@Param('id') id: string, @Body() body: any) {
  //   return this.userService.remove(+id, body);
  // }
}
