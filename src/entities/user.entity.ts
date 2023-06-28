import { Entity, Column, BaseEntity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @Column()
  statusCounter: number;

  @Column()
  messageTimeCounter: number;

  @Column({ nullable: true })
  doNotDisturb: string;

  @Column()
  billStatus: string;

  @Column({ nullable: true })
  @Index()
  payday: string;
}
