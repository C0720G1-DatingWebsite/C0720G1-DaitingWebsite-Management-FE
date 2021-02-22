import {IAccount} from './account';

export interface IStatus {
  id: number;
  name: string;

  accountList: IAccount[];
}
