import { Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserWordEntity } from '../entities/userWord.entity';
import { UserWordService } from './userWord.service';
import { TranslationService } from './translation.service';
import { WordService } from './word.service';
@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserWordEntity)
    protected readonly userWordRepository: Repository<UserWordEntity>,
    @Inject(UserWordService)
    protected readonly userWordService: UserWordService,
    @Inject(TranslationService)
    protected readonly translationService: TranslationService,
    @Inject(WordService)
    protected readonly wordService: WordService,
  ) {}

  async globalUpdate() {
    const users = await this.userRepository.find();
    const actions = [];
    for (const user of users) {
      const { status, statusCounter } = user;
      const userWord = await this.userWordService.getOldestSeenWord(
        user.id,
        status,
      );


      if (statusCounter > 0) {
        user.statusCounter -= 1;
        if (user.status !== 'new') {
          user.status = 'new';
          user.statusCounter = 2;
        }
        await this.userRepository.save(user);
      } else {
        switch (status) {
          case 'new':
            user.status = 'familiar';
            user.statusCounter = 3;
            await this.userRepository.save(user);
            break;
          case 'familiar':
            user.status = 'forgotten';
            user.statusCounter = 5;
            await this.userRepository.save(user);
        }
      }

      const word = await this.wordService.findOneById(userWord.wordId);
      const fiveRandomTranslations =
        await this.translationService.getFiveRandomTranslations(word.title);

      actions.push({ word, fiveRandomTranslations, userId: user.id });
    }

    return actions;
  }
}
