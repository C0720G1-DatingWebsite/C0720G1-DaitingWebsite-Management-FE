import {IPost} from './post';
import {IImageGroup} from './image-group';
import {IAccountGroup} from './account-group';
import {IReport} from './report';

export interface IGroup {
  id: number;
  name: string;
  about: string;
  avatar: string;
  background: string;
  dateRegister: string;

  postList: IPost[];
  imageGroupList: IImageGroup[];
  accountGroupList: IAccountGroup[];
  reportList: IReport[];
}
