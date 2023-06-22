import { IsString } from 'class-validator';

export interface IWord {
  title: string;
}

export class IWordDTO implements IWord {
  @IsString()
  title: string;
}
