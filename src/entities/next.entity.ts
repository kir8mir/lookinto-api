import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity({ name: 'next' })
export class NextEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  wordId: number;

  @Column()
  @Index()
  userId: string;
}
