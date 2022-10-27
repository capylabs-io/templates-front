import { action, observable, computed } from "mobx";
import moment, { now } from "moment";

export class DaoViewModel {
  @observable isOpenAddProposal = false;
  @observable instructionList = [
    "Instruction 1",
    "Instruction 2",
    "Instruction 3",
    "Instruction 3",
  ];
  @observable proposalID = 0;
  @observable pageSize = 3;
  @observable currentPage = 1;
  @observable totalPage = 3;
  @observable voteEnd="2022/10/31";
  @observable isVoted = false;
  @observable showVoteResult = false;
  @observable isOpenVoteConfirm = false;
  @observable isVoteYes = false;
  @observable isVoteDone = false;
  @observable loading = false;
  @observable chartOptions =  {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["3Q3ph...RGvG8", "3Q3ph...RGvG8", "3Q3ph...RGvG8", "3Q3ph...RGvG8", "Other"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  @action changeAddProposalDialog() {
    this.isOpenAddProposal = !this.isOpenAddProposal;
  }
  @action changeVoteConfirmDialog(isVoteYes) {
    this.isVoteYes = isVoteYes;
    this.isOpenVoteConfirm = !this.isOpenVoteConfirm;
  }
  @action gotoProposalDetail() {
    this.proposalID = 1;
  }
  @action backSolendDao() {
    this.proposalID = 0;
  }
  @action voting() {
    this.isOpenVoteConfirm = false;
    this.isVoted = true;
  }
  @action voteExcute() {
    this.loading = true;
    this.isVoteDone = true;
    this.loading = false;
  }
  @action gotoVoteResult() {
    this.showVoteResult = true;
  }
  @action backPropoDetail() {
    this.showVoteResult = false;
  }

  // computed
  // @computed get eventEndDate() {
  //   return moment(this.voteEnd).isBefore(now());
  // }
}
