import { DaoSettingModel } from "./dao-setting-model";

export interface ApplicationModel {
  id: string;
  name: string;
  service?: "dao";
  metadata?: any;
  isCustomized?: boolean;
  appId: number;
  defaultDomain: string;
  user?: any;
  dao_setting: DaoSettingModel;
  updatedAt?: string;
  createdAt?: string;
  status: string;
}
