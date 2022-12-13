import { ApplicationModel } from "./application-model";
import { FixedNumber } from "@ethersproject/bignumber";

export interface DaoSettingModel {
  id: string;
  type: string;
  isExisted: boolean;
  tokenAddress: string;
  threshold: number;
  weight: number;
  isCouncil: boolean;
  council?: any;
  totalSupply: FixedNumber;
  application: ApplicationModel;
  updatedAt: string;
  createdAt: string;
  members: any;
  otherSetting: any;
}
