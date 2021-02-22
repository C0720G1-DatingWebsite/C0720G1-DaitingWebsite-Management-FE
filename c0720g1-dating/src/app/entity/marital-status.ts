import {IAccount} from './account';

export interface IMaritalStatus {
  id: number;
  name: string;

  accountList: IAccount[];
}
