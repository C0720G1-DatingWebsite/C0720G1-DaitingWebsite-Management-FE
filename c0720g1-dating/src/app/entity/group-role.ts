import {IGroup} from './group';

export interface IGroupRole {
  id: number;
  name: string;

  groupList: IGroup[];
}
