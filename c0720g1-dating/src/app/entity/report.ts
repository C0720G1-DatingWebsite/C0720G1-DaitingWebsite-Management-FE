import {IReportContent} from './report-content';
import {IAccount} from './account';
import {IUserGroup} from './user-group';

export interface IReport {
  id: number;
  dateReport: string;

  reportContent: IReportContent;
  accountVictim: IAccount;
  accountTarget: IAccount;
  group: IUserGroup;
}
