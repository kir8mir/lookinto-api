import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  ManyToOne,
} from 'typeorm';
import { WordEntity } from './word.entity';

@Entity({ name: 'translation' })
export class TranslationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @ManyToOne(() => WordEntity, { onDelete: 'CASCADE' })
  word: WordEntity;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;
}
