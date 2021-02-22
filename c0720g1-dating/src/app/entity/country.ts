import {IAccount} from './account';

export interface ICountry {
  id: number;
  name: string;

  accountList: IAccount[];
}
