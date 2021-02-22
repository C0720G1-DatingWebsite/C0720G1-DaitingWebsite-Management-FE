import {IPost} from './post';

export interface IPolicy {
  id: number;
  name: string;

  postList: IPost[];
}
