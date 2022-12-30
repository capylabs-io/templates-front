import { ProposalModel } from "./proposal-model";
import { CommentModel } from "./comment-model";
import { ApplicationModel } from "./application-model";
import { ThemeModel } from "./theme-model";

export interface UserModel {
  id: string;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  address: string;
  role: any;
  metadata: any;
  applications: ApplicationModel[];
  comments: CommentModel[];
  proposals: ProposalModel[];
  themes: ThemeModel[];
}
