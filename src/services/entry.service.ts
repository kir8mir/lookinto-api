import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from '../entities/word.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(WordEntity)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}

  async globalUpdate() {
    const user = await this.userRepository.find()[0];
    return user;
  }
}
