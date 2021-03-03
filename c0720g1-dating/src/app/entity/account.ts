import {IImageAccount} from './image-account';
import {IPersonalHobbies} from './personal-hobbies';
import {ICustomerView} from './customer-view';
import {IFriend} from './friend';
import {IAccountRole} from './account-role';
import {IComment} from './comment';
import {IAccountChat} from './account-chat';
import {IAccountGroup} from './account-group';
import {IReport} from './report';
import {IFeedback} from './feedback';
import {IMaritalStatus} from "./marital-status";
import { IStatus } from './status';
import {ICountry} from "./country";
import {ICity} from "./city";
import {IJob} from "./job";

export interface IAccount {
  id: number;
  userName: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  enable: boolean;
  gender: boolean;
  audience: boolean;
  accountDescribe: string;
  avatar: string;
  backgroundImage: string;
  dateRegister: string;

  maritalStatus: IMaritalStatus;
  status: IStatus;
  country: ICountry;
  city: ICity;
  job: IJob;

  imageAccountList: IImageAccount[];
  personalHobbiesList: IPersonalHobbies[];
  customerViewList: ICustomerView[];
  friendList: IFriend[];
  accountRoleList: IAccountRole[];
  commentList: IComment[];
  accountChatList: IAccountChat[];
  accountGroupList: IAccountGroup[];
  reportList: IReport[];
  feedbackList: IFeedback[];
}
