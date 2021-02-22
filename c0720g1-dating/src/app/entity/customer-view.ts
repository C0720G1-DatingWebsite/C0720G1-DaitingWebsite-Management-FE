import {IAccount} from './account';
import {IPost} from './post';

export interface ICustomerView {
  id: number;

  account: IAccount;
  post: IPost;
}
