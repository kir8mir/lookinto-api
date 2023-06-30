import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserWordEntity } from '../entities/userWord.entity';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserWordEntity)
    protected readonly userWordRepository: Repository<UserWordEntity>,
  ) {}

  async globalUpdate() {
    const users = await this.userRepository.find({
      where: { status: 'ready' },
    });
    const userWord = await this.userWordRepository.find();
    const updatedUsersArr = [];

    // const updatedUsers = () => {
    //   const updatedUsers = [];
    //   for (const user of users) {

    //   }
    // };
    return [...users, ...userWord];
  }
}
