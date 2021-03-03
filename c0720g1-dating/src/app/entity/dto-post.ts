import {IAccount} from './account';
import {ICustomerView} from './customer-view';
import {IComment} from './comment';
import {IUserGroup} from './user-group';
import {DtoPolicy} from "./DtoPolicy";

export interface DtoPost {
  id: number;
  content: string;
  postTime: string;
  likeCount: number;
  img: string;
  account: IAccount;
  group: IUserGroup;
  policy: DtoPolicy;
  customerViewList: ICustomerView[];
  commentList: IComment[];
}
