import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from '../entities/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    protected readonly repository: Repository<WordEntity>,
  ) {}

  async create(data) {
    const model = new WordEntity();

    model.title = data.title;

    model.created_at = new Date();
    model.updated_at = new Date();
    return await model.save();
  }

  async getAll() {
    return await this.repository.find();
  }

  async findOneById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: { translations: true },
    });
  }
}
