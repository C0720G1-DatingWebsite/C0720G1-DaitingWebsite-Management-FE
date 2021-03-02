import {IPost} from './post';

export interface IPolicy {
  idPolicy: number;
  namePolicy: string;

  postList: IPost[];
}
