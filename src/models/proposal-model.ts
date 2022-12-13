import { VoteModel } from "./vote-model";
import { CommentModel } from "./comment-model";
import { UserModel } from "./user-model";
import { ApplicationModel } from "./application-model";

export interface ProposalModel {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  quorum: number;
  endTimeVote: Date;
  tokenQuorum: string;
  onHold: number;
  voteType: string;
  transactions: any;
  votes: VoteModel[];
  comments: CommentModel[];
  user: UserModel;
  default: boolean;
  application: ApplicationModel;
  createdAt: string;
  updatedAt: string;
}
