import { Controller, Get } from '@nestjs/common';
import { EntryService } from '../services/entry.service';

@Controller('api')
export class EntryController {
  constructor(protected entryService: EntryService) {}

  @Get('/update')
  async update() {
    return this.entryService.globalUpdate();
  }
}
