import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NextEntity } from '../entities/next.entity';

@Injectable()
export class NextService {
  constructor(
    @InjectRepository(NextEntity)
    protected readonly repository: Repository<NextEntity>,
  ) {}

  async create(data) {
    const model = new NextEntity();
    model.wordId = data.wordId;
    model.userId = data.userId;
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
