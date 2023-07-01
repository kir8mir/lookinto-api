import { Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserWordEntity } from '../entities/userWord.entity';
import { WordService } from './word.service';
import { TranslationService } from './translation.service';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWordEntity)
    protected readonly repository: Repository<UserWordEntity>,
    @Inject(WordService)
    protected readonly wordService: WordService,
    @Inject(TranslationService)
    protected readonly translationService: TranslationService,
  ) {}

  async create(data) {
    const model = new UserWordEntity();
    model.wordId = data.wordId;
    model.userId = data.userId;
    model.status = 'new';
    model.progressCounter = 3;
    return await model.save();
  }

  async getAll() {
    return await this.repository.find();
  }

  async changeWordStatusImmediately(body: any) {
    const { userId, status, words } = body;

    for (const word of words) {
      const wordForChange = await this.repository.findOne({
        where: { userId, wordId: word.id },
      });
      wordForChange.status = status;
      switch (status) {
        case 'new':
          wordForChange.progressCounter = 3;
        case 'familiar':
          wordForChange.progressCounter = 5;
        case 'forgotten':
          wordForChange.progressCounter = 8;
      }
      await this.repository.save(wordForChange);
    }
    return 'success';
  }

  async getUserWordsByUserId(id: string) {
    return await this.repository.find({
      where: { userId: id },
    });
  }

  async addNewWord(id: string, { origin, translation }) {
    const newWord = await this.wordService.create({ title: origin });
    const newTranslation = await this.translationService.create({
      title: translation,
      word: newWord.id,
    });

    const userWord = await this.create({ wordId: newWord.id, userId: id });
    return { newWord, newTranslation, userWord };
  }

  async getOldestSeenWord(id: string, status: string) {
    const words = await this.repository.find({
      where: { userId: id },
    });
    let filteredWords = words.filter((word) => word.status === status);
    if (!filteredWords.length) {
      switch (status) {
        case 'new':
          filteredWords = words.filter((word) => word.status === 'familiar');
          if (!filteredWords.length) {
            filteredWords = words.filter((word) => word.status === 'forgotten');
          }
          break;
        case 'familiar':
          filteredWords = words.filter((word) => word.status === 'forgotten');
          if (!filteredWords.length) {
            filteredWords = words.filter((word) => word.status === 'new');
          }
          break;
        case 'forgotten':
          filteredWords = words.filter((word) => word.status === 'new');
          if (!filteredWords.length) {
            filteredWords = words.filter((word) => word.status === 'familiar');
          }
      }
    }
    filteredWords.sort((a, b) => b.progressCounter - a.progressCounter);
    const oldestWord = filteredWords[0];
    return oldestWord;
  }

  async getById(id: string) {
    return await this.repository.findOne({
      where: { id: +id },
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

  async getAllFamiliar(id: string) {
    const familiarWords = await this.repository.find({
      where: { userId: id, status: 'familiar' },
    });

    const result = [];

    for (const word of familiarWords) {
      const resultWord = await this.wordService.findOneById(word.wordId);
      result.push(resultWord);
    }
    return result;
  }

  async getAllForgotten(id: string) {
    const forgottenWords = await this.repository.find({
      where: { userId: id, status: 'forgotten' },
    });

    const result = [];

    for (const word of forgottenWords) {
      const resultWord = await this.wordService.findOneById(word.wordId);
      result.push(resultWord);
    }
    return result;
  }

  async remove(wordId: number, body: any) {
    const userId = body.userId;
    const word = await this.repository.findOne({
      where: { wordId, userId },
    });

    return await this.repository.delete(word.id);
  }
}
