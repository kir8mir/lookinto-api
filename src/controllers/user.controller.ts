import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(protected userService: UserService) {}

  @Post()
  async create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Get('')
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  // @Delete(':id')
  // async removeWordFromNext(@Param('id') id: string, @Body() body: any) {
  //   return this.userService.remove(+id, body);
  // }
}
