import { CommentModel } from "./comment-model";
import { ProposalModel } from "./proposal-model";
import { UserModel } from "./user-model";
export interface VoteModel {
  id: string;
  vote: boolean;
  user: UserModel;
  proposal: ProposalModel;
  comment: CommentModel;
  token: string;
  amount: string;
}
