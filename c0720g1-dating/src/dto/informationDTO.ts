import {ICountry} from "../app/entity/country";
import {ICity} from "../app/entity/city";
import {IJob} from "../app/entity/job";

export interface InformationDTO {
  fullName: string;
  address: String;
  county: any;
  city: any;
  job: any;
  audience: boolean;
  accountDescribe: string;
  avatar: string;

}
