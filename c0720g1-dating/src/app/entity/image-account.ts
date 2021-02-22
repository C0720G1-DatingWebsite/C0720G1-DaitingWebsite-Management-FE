import {IAccount} from './account';

export interface IImageAccount {
  id: number;
  imageUrl: string;

  account: IAccount;
}
