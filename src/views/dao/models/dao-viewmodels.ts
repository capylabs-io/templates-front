import { appProvider } from "@/app-providers";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { apiService } from "@/services/api-service";
import { walletStore } from "@/stores/wallet-store";
import { action, observable, computed, flow } from "mobx";
import moment, { now } from "moment";

export class DaoViewModel {
  @observable isOpenAddProposal = true;
  @observable transactionList = ["none", "Transfer Token", "Mint Token"];
  @observable proposalID = 0;
  @observable pageSize = 3;
  @observable currentPage = 1;
  @observable totalPage = 3;
  @observable voteEnd = "2022/10/31";
  @observable isVoted = false;
  @observable showVoteResult = false;
  @observable isOpenVoteConfirm = false;
  @observable isVoteYes = false;
  @observable isVoteDone = false;
  @observable loading = false;
  @observable chartOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [
      "3Q3ph...RGvG8",
      "3Q3ph...RGvG8",
      "3Q3ph...RGvG8",
      "3Q3ph...RGvG8",
      "Other",
    ],
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
  @observable title = "";
  @observable description = "";
  @observable quorum = "";
  @observable transactions = [
    {
      type: "none",
      source: "0x00",
      destination: "0x00",
      explorer: null,
      config: {},
      token: "1",
    },
    {
      type: "none",
      source: "0x00",
      destination: "0x00",
      explorer: null,
      config: {},
      token: "1",
    },
  ];

  createApplication = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      yield apiService.addProposal({
        appId: "950467437867",
        userId: walletStore.userId,
        data: {
          title: this.title,
          description: this.description,
          quorum: this.quorum,
          transactions: this.transactions,
        },
      });
      //TODO: Add to localstorage
      snackController.success("Add Proposal successfully!");
    } catch (err: any) {
      snackController.commonError(err);
    } finally {
      loadingController.decreaseRequest();
      this.isOpenAddProposal = false;
    }
  });

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
  @action removeTransaction(index) {
    this.transactions.splice(index, 1);
  }
  @action addTransaction() {
    this.transactions.push({
      type: "none",
      source: "0x00",
      destination: "0x00",
      explorer: null,
      config: {},
      token: "1",
    });
  }
  // computed
  // @computed get eventEndDate() {
  //   return moment(this.voteEnd).isBefore(now());
  // }
}
