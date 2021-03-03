import {IAccount} from './account';
import {IPost} from "./post";

export interface IAccountPost {
  id: number;
  account: IAccount;
  pots : IPost;
}
