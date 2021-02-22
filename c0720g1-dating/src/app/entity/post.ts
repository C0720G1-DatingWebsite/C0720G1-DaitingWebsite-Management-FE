import {IAccount} from './account';
import {IPolicy} from './policy';
import {ICustomerView} from './customer-view';
import {IComment} from './comment';
import {IGroup} from './group';

export interface IPost {
  id: number;
  content: string;
  postTime: string;
  likeCount: number;

  account: IAccount;
  group: IGroup;
  policy: IPolicy;
  customerViewList: ICustomerView[];
  commentList: IComment[];
}
