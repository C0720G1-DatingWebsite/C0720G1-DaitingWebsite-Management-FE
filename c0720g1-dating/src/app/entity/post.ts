import {IAccount} from './account';
import {IPolicy} from './policy';
import {ICustomerView} from './customer-view';
import {IComment} from './comment';
import {IUserGroup} from './user-group';

export interface IPost {
  id: number;
  content: string;
  postTime: string;
  likeCount: number;

  account: IAccount;
  group: IUserGroup;
  policy: IPolicy;
  customerViewList: ICustomerView[];
  commentList: IComment[];
}
