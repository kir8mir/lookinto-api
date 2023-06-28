import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity({ name: 'userword' })
export class UserWordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  wordId: number;

  @Column()
  @Index()
  userId: string;

  @Column()
  status: string;

  @Column()
  statusCounter: number;
}
