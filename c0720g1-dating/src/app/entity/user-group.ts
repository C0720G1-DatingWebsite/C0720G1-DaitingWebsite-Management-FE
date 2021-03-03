import {IPost} from './post';
import {IImageGroup} from './image-group';
import {IAccountGroup} from './account-group';
import {IReport} from './report';

export interface IUserGroup {
  id: number;
  name: string;
  about: string;
  avatar: string;
  background: string;
  dateRegister: string;
  check: boolean;

  postList: IPost[];
  imageGroupList: IImageGroup[];
  accountGroupList: IAccountGroup[];
  reportList: IReport[];
}
