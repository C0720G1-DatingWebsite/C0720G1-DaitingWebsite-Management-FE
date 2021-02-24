import {IAccount} from './account';
import {IUserGroup} from './user-group';
import {IGroupRole} from './group-role';

export interface IAccountGroup {
  id: number;

  account: IAccount;
  group: IUserGroup;
  groupRole: IGroupRole;
}
