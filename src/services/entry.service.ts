import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}

  async globalUpdate() {
    const user = await this.userRepository.find();
    return user;
  }
}
