export class SearchAndPage {
  name: string;
  job: string;
  hobbies: string;
  startYear: string;
  endYear: string;
  gender: number;
  city: number;
  currentPage: number;
  maxPage: number;
  totalResult: number;


  constructor() {
    this.name = '';
    this.job = '';
    this.hobbies = '';
    this.startYear = '';
    this.endYear = '';
    this.gender = 3;
    this.city = 0;
    this.currentPage = 1;
    this.maxPage = 0;
    this.totalResult = 0;
  }
}
