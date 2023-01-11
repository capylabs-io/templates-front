import { UserModel } from "./user-model";
import { ProposalModel } from "./proposal-model";
import { VoteModel } from "./vote-model";
export interface CommentModel {
  id: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  proposal: ProposalModel;
  user: UserModel;
  vote: VoteModel;
}
