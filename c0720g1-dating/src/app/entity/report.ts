import {IReportContent} from './report-content';
import {IAccount} from './account';
import {IGroup} from './group';

export interface IReport {
  id: number;
  dateReport: string;

  reportContent: IReportContent;
  accountVictim: IAccount;
  accountTarget: IAccount;
  group: IGroup;
}
