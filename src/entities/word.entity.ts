import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  OneToMany,
} from 'typeorm';
import { TranslationEntity } from './translation.entity';

@Entity({ name: 'word' })
export class WordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @OneToMany(() => TranslationEntity, (translation) => translation.word, {
    nullable: true,
    cascade: true,
  })
  translations: TranslationEntity[];

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;
}
