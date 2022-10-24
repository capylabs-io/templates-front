import { action, observable } from "mobx";

export class DaoViewModel {
  @observable isOpenAddProposal = false;
  @observable instructionList = [
    "Instruction 1",
    "Instruction 2",
    "Instruction 3",
    "Instruction 3",
  ];
  @observable proposalID = 1;
  @observable pageSize = 3;
  @observable currentPage = 1;
  @observable totalPage = 3;
  @observable voteEnd="2022/12/31";
  @observable isVoted = false;
  @observable showVoteResult = true;

  @action changeAddProposalDialog() {
    this.isOpenAddProposal = !this.isOpenAddProposal;
  }
  @action gotoProposalDetail() {
    this.proposalID = 1;
  }
  @action backSolendDao() {
    this.proposalID = 0;
  }
  @action voting() {
    this.isVoted = true;
  }
  @action gotoVoteResult() {
    this.showVoteResult = true;
  }
  @action backPropoDetail() {
    this.showVoteResult = false;
  }
}
