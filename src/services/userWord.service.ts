import { WordEntity } from './../entities/word.entity';
import { Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWordEntity } from '../entities/userWord.entity';
import { WordService } from './word.service';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWordEntity)
    protected readonly repository: Repository<UserWordEntity>,
    @Inject(WordService)
    protected readonly wordService: WordService,
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

  async getUserWordsByUserId(id: string) {
    return await this.repository.find({
      where: { userId: id },
    });
  }

  async getAllNew(id: string) {
    const newWords = await this.repository.find({
      where: { userId: id, status: 'new' },
    });
    return newWords.map(async (word: any) => {
      const result = await this.wordService.findOneById(word.id);
      console.log('result', result.title);
      return result;
    });
  }

  async getAllFamiliar(id: string) {
    return await this.repository.find({
      where: { userId: id, status: 'familiar' },
    });
  }

  async getAllForgotten(id: string) {
    return await this.repository.find({
      where: { userId: id, status: 'forgotten' },
    });
  }
  async remove(wordId: number, body: any) {
    const userId = body.userId;
    const word = await this.repository.findOne({
      where: { wordId, userId },
    });

    return await this.repository.delete(word.id);
  }
}
