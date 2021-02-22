import {IAccountRole} from './account-role';

export interface IRole {
  id: number;
  name: string;

  accountRoleList: IAccountRole[];
}
