import { Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

    const result = [];

    for (const word of newWords) {
      const resultWord = await this.wordService.findOneById(word.wordId);
      result.push(resultWord);
    }
    return result;
  }

  async changeWordStatusImmediately(body: any) {
    const { userId, status, words } = body;
    console.log('body', body);
    switch (status) {
      case 'new':
        async () => {
          for (const word of words) {
            const wordForChange = await this.repository.findOne({
              where: { userId, wordId: word.id },
            });
            wordForChange.status = status;
          }
          console.log('nwew');
          return 'success';
        };
      case 'familiar':
        async () => {
          for (const word of words) {
            const wordForChange = await this.repository.findOne({
              where: { userId, wordId: word.id },
            });
            wordForChange.status = status;
          }
          console.log('famil');
          return 'success';
        };
      case 'forgotten':
        async () => {
          for (const word of words) {
            const wordForChange = await this.repository.findOne({
              where: { userId, wordId: word.id },
            });
            wordForChange.status = status;
          }
          console.log('forgotten');
          return 'success';
        };
    }
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
