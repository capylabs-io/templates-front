import { ThemeModel } from "./theme-model";
import { ProposalModel } from "./proposal-model";
import { UserModel } from "./user-model";
import { DaoSettingModel } from "./dao-setting-model";

export interface ApplicationModel {
  id: string;
  name: string;
  service: string;
  metadata: any;
  isCustomized: boolean;
  appId: number;
  defaultDomain: string;
  user: UserModel;
  dao_setting: DaoSettingModel;
  updatedAt: string;
  createdAt: string;
  status: string;
  proposals: ProposalModel[];
  theme: ThemeModel;
}
