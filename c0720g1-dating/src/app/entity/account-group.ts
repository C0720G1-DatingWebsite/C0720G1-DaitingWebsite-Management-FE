import {IAccount} from './account';
import {IGroup} from './group';
import {IGroupRole} from './group-role';

export interface IAccountGroup {
  id: number;

  account: IAccount;
  group: IGroup;
  groupRole: IGroupRole;
}
