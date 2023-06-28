import { Controller, Get } from '@nestjs/common';
import { EntryService } from '../services/entry.service';

@Controller('api')
export class ApiController {
  constructor(protected entryService: EntryService) {}

  @Get('/update')
  async update() {
    return this.entryService.globalUpdate();
  }
}
