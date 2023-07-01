import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TranslationEntity } from '../entities/translation.entity';
import { WordEntity } from '../entities/word.entity';

@Injectable()
export class TranslationService {
  constructor(
    @InjectRepository(TranslationEntity)
    protected readonly repository: Repository<TranslationEntity>,
  ) {}

  async create(data) {
    const model = new TranslationEntity();

    model.title = data.title;

    model.created_at = new Date();
    model.updated_at = new Date();
    model.word = { id: data.word } as WordEntity;
    return await model.save();
  }

  async getAllTranslationsForWord(wordId: number) {
    return await this.repository.find({ where: { word: { id: wordId } } });
  }

  async getFiveRandomTranslations(title: string) {
    const translations = await this.getAll();
    const withoutCurrent = translations.filter(
      (translation) => translation.title !== title,
    );
    const randomTranslations = [];
    while (randomTranslations.length < 5) {
      const randomIndex = Math.floor(Math.random() * withoutCurrent.length);
      const randomTranslation = withoutCurrent[randomIndex];
      if (!randomTranslations.includes(randomTranslation)) {
        randomTranslations.push(randomTranslation);
      }
    }
    return randomTranslations;
  }

  async getAll() {
    return await this.repository.find();
  }

  async findOneById(id: number) {
    return await this.repository.findOne({
      where: { id },
    });
  }
}
