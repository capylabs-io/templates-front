import { ProposalModel } from "./proposal-model";
export interface VoteModel {
  id: string;
  vote: boolean;
  userAddress: string;
  proposal: ProposalModel;
}
