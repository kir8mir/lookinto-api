import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {}

  async create(data) {
    const model = new UserEntity();
    model.id = data.id;
    model.password = data.password;
    model.email = data.email;
    model.status = 'ready';
    model.statusCounter = 4;
    model.messageTimeCounter = data.messageTimeCounter;
    model.doNotDisturb = null;
    model.billStatus = 'free';
    model.payday = null;
    return await model.save();
  }

  async getAll() {
    return await this.repository.find();
  }

  async getById(id: string) {
    return await this.repository.findOne({
      where: { id },
    });
  }

  // async remove(wordId: number, body: any) {
  //   const userId = body.userId;
  //   const word = await this.repository.findOne({
  //     where: { wordId, userId },
  //   });

  //   return await this.repository.delete(word.id);
  // }
}
