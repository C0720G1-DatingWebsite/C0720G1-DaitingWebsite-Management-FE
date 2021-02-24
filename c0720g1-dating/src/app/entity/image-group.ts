import {IUserGroup} from './user-group';

export interface IImageGroup {
  id: number;
  image_url: string;

  group: IUserGroup;
}
