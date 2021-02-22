import {IPost} from './post';
import {IAccount} from './account';

export interface IComment {
  id: number;
  content: string;
  dateComment: string;

  post: IPost;
  account: IAccount;
  comment: IComment;
}
