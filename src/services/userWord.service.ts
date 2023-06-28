import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWordEntity } from '../entities/userWord.entity';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWordEntity)
    protected readonly repository: Repository<UserWordEntity>,
  ) {}

  async create(data) {
    const model = new UserWordEntity();
    model.wordId = data.wordId;
    model.userId = data.userId;
    model.status = 'new';
    model.statusCounter = 4;
    return await model.save();
  }

  async getAll() {
    return await this.repository.find();
  }

  async remove(wordId: number, body: any) {
    const userId = body.userId;
    const word = await this.repository.findOne({
      where: { wordId, userId },
    });

    return await this.repository.delete(word.id);
  }
}
