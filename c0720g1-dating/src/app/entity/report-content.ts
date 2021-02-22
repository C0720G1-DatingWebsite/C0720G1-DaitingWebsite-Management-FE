import {IReport} from './report';

export interface IReportContent {
  id: number;
  name: string;

  reportList: IReport[];
}
