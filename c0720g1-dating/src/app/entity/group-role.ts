import {IUserGroup} from './user-group';

export interface IGroupRole {
  id: number;
  name: string;

  groupList: IUserGroup[];
}
