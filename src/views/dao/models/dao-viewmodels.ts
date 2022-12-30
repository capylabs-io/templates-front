import { applicationStore } from "../../../stores/application-store";
import { ProposalModel } from "./../../../models/proposal-model";
import { DaoSettingModel } from "./../../../models/dao-setting-model";
import { walletStore } from "@/stores/wallet-store";
import { ApplicationModel } from "./../../../models/application-model";
import { get } from "lodash-es";
import { apiService } from "./../../../services/api-service";
import { appProvider } from "@/app-providers";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { action, observable, computed, flow } from "mobx";
import moment, { now } from "moment";
import { snackController } from "@/components/snack-bar/snack-bar-controller";

export class DaoViewModel {
  @observable isReview = false;
  @observable reviewPage: string = "management";

  @observable searchKey = "";
  @observable filterCancelled = false;
  @observable filterPassed = false;
  @observable filterFailed = false;
  @observable filterOnHold = false;
  @observable filterExecuting = false;
  @observable filterVoting = false;
  @observable filterDraft = false;

  @observable daoSetting?: DaoSettingModel;
  @observable pickParameters = false;
  @observable pickDao = true;
  @observable pickMembers = false;
  @observable proposals: ProposalModel[] = [];
  @observable itemsPerPage = 8;
  @observable proposalPage = 1;

  @observable isProposalDetail = false;
  @observable proposal?: ProposalModel;

  @observable instructionList = ["Instruction 1", "Instruction 2", "Instruction 3", "Instruction 3"];
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
  // Add Proposal
  @observable isOpenAddProposal = false;
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

  // Member
  @observable openMemberFlag = false;

  applicationStore = applicationStore;

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

  fetchApplication = flow(function* (this, appId) {
    try {
      loadingController.increaseRequest();
      const res = yield apiService.applications.find({
        appId,
        userId: walletStore.userId,
      });
      if (!res || !res.applications || res.applications.length == 0)
        this.pushBackHome("Application does not exist!");

      const application = res.applications[0];
      this.applicationStore.application = application;
      this.daoSetting = application.dao_setting;
      if (!application || !application.service || !application.dao_setting)
        this.pushBackHome(`Invalid service type!`);
      else if ((!application.isCustomized || !application.theme) && !this.isReview) {
        appProvider.router.replace(
          `/customize-interface?type=${application.service}&appId=${application.appId}`
        );
        return;
      }

      if ((!application.proposals || application.proposals.length == 0) && this.isReview)
        yield this.fetchDefaultProposals();
      else this.proposals = application.proposals;

      const proposalId = appProvider.router.currentRoute.params.proposalId;
      if (!proposalId) this.isProposalDetail = false;
      else {
        this.proposal = this.proposals.find((proposal) => proposal.id == proposalId);
        this.isProposalDetail = true;
      }

      if (!this.applicationStore.themeConfig) this.applicationStore.setupThemeConfig(application.theme);
      this.applicationStore.setupMetadata(application.metadata);
    } catch (err: any) {
      console.error("err", err);
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  fetchDefaultProposals = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const proposals = yield apiService.getDefaultProposal();
      if (!proposals || proposals.length == 0) {
        this.pushBackHome(`Error occurred, please try again later!`);
        return;
      }
      this.proposals = proposals;
    } catch (err: any) {
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action pushBackHome(error: any) {
    snackController.error(error);
    if (walletStore.connected) appProvider.router.replace("/management");
    else appProvider.router.replace("/home");
  }

  @action setIsReview(val: boolean) {
    this.isReview = val;
  }

  @action setpickParameters(val: boolean) {
    this.pickParameters = val;
  }
  @action setpickMembers(val: boolean) {
    this.pickMembers = val;
  }
  @action setpickDao(val: boolean) {
    this.pickDao = val;
  }
  @action setReviewPage(val: string) {
    this.reviewPage = val;
  }
  @action setCurrentProposal(val: ProposalModel) {
    this.proposal = val;
  }
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

  @computed get filteredProposals() {
    if (!this.proposals) return [];
    return this.proposals.filter((proposal) => {
      if (
        this.searchKey &&
        !proposal.title.includes(this.searchKey) &&
        !proposal.description.includes(this.searchKey)
      )
        return false;
      if (this.filterCancelled && proposal.status == "cancelled") return true;
      if (this.filterPassed && proposal.status == "passed") return true;
      if (this.filterFailed && proposal.status == "failed") return true;
      if (this.filterExecuting && proposal.status == "executing") return true;
      if (this.filterOnHold && proposal.status == "onHold") return true;
      if (this.filterVoting && proposal.status == "voting") return true;
      if (this.filterDraft && proposal.status == "draft") return true;
      return (
        !this.filterCancelled &&
        !this.filterPassed &&
        !this.filterFailed &&
        !this.filterExecuting &&
        !this.filterOnHold &&
        !this.filterVoting &&
        !this.filterDraft
      );
    });
  }

  @computed get slicedProposals() {
    if (!this.proposals) return [];
    return this.filteredProposals.slice(
      (this.proposalPage - 1) * this.itemsPerPage,
      this.proposalPage * this.itemsPerPage
    );
  }

  @computed get proposalLength() {
    return this.filteredProposals.length;
  }

  @computed get totalProposalPage() {
    if (!this.proposals || this.proposals.length == 0) return 1;
    if (this.filteredProposals.length % this.itemsPerPage! == 0)
      return this.filteredProposals.length / this.itemsPerPage!;
    else return Math.floor(this.filteredProposals.length / this.itemsPerPage!) + 1;
  }

  @computed get currentProposal() {
    if (!this.proposals) return;
    else if (this.isReview) return this.proposals[0];
    return this.proposal;
  }
}
