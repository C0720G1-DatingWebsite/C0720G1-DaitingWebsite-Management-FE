import {IAccount} from './account';
import {IHobbies} from './hobbies';

export interface IPersonalHobbies {
  id: number;
  
  account: IAccount;
  hobbies: IHobbies;
}
