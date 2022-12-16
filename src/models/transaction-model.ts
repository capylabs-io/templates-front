import { ProposalModel } from "./proposal-model";
export interface TransactionModel {
  id: string;
  type: string;
  source: string;
  destination: string;
  explorer: string;
  config: any;
  token: string;
  proposal: ProposalModel;
}
