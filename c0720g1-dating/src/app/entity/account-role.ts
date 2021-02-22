import {IAccount} from './account';
import {IRole} from './role';

export interface IAccountRole {
  id: number;

  account: IAccount;
  role: IRole;
}
