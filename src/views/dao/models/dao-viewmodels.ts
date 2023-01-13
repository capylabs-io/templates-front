import { CommentModel } from "./../../../models/comment-model";
import { VoteModel } from "./../../../models/vote-model";
import { FixedNumber } from "@ethersproject/bignumber";
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
import { Observable } from "rxjs";

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

  @observable daoSetting!: DaoSettingModel;
  @observable minAmountToCreate?: number = 1000000;
  @observable communityMintFactor?: number = 1;

  @observable councilApprovalQuorum?: number = 60;
  @observable pickParameters = false;
  @observable pickMembers = false;
  @observable pickConfig = false;
  @observable pickAddMembers = false;
  @observable pickDao = true;
  @observable members = [
    {
      wallet: "",
      isYou: true,
    },
  ];
  @observable memberAddress: string = "";
  @observable proposals: ProposalModel[] = [];
  @observable votes: VoteModel[] = [];
  @observable comments: CommentModel[] = [];
  @observable votesAmount: number = 0;
  @observable votesYes: number = 0;
  @observable votesNo: number = 0;
  @observable numberOfVotes: number = 0;
  @observable itemsPerPage = 8;
  @observable proposalPage = 1;

  @observable instructionList = ["Instruction 1", "Instruction 2", "Instruction 3", "Instruction 3"];
  @observable transactionList = ["None", "Transfer Token", "Mint Token"];
  @observable proposalID = 0;
  @observable pageSize = 3;
  @observable currentPage = 1;
  @observable totalPage = 3;
  @observable voteEnd = "2022/10/31";
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
  @observable proposalTitle = "";
  @observable proposalDescription = "";
  @observable proposalQuorum = 50;
  @observable proposalTransactions = [
    {
      type: "None",
      source: "0x00",
      destination: "0x00",
      explorer: "",
      config: {},
      token: "",
      amount: 0,
    },
  ];
  //form
  @observable configChangeform?: boolean;
  @observable addMemberform?: boolean;
  // Member
  @observable openMemberFlag = false;

  applicationStore = applicationStore;

  createProposal = flow(function* (this) {
    if (!applicationStore || !applicationStore.application) {
      snackController.error("Invalid application!");
      return;
    }
    try {
      loadingController.increaseRequest();
      const createdProposal = yield apiService.proposals.create({
        appId: applicationStore.application!.appId,
        userId: walletStore.userId,
        application: applicationStore.application!.id,
        title: this.proposalTitle,
        description: this.proposalDescription,
        //type:
        //endTimeVote:
        //tokenQuorum:

        //voteType: => if vote equally => need requiredTokenAmount to vote
        //Draft => Deploy
        status: "draft",
        quorum: this.proposalQuorum,
        creator: walletStore.userId,
      });

      const promises = this.proposalTransactions.map(async (transaction) => {
        if (transaction.type == "None") return;
        return apiService.transactions.create({
          ...transaction,
          appId: applicationStore.application!.appId,
          userId: walletStore.userId,
          amount: FixedNumber.from(transaction.amount).toString(),
          proposalId: createdProposal.id,
        });
      });
      yield Promise.all(promises);

      yield this.fetchApplication(applicationStore.application!.appId);
      //TODO: Add to localstorage
      snackController.success("Add Proposal successfully!");

      this.isOpenAddProposal = false;
    } catch (err: any) {
      snackController.commonError(err);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  fetchApplication = flow(function* (this, appId) {
    try {
      loadingController.increaseRequest();
      const applications = yield apiService.applications.find({
        appId,
        _limit: -1,
      });
      if (!applications) {
        this.pushBackHome("Application does not exist!");
        return;
      }

      const application = applications[0];
      this.applicationStore.application = application;
      this.daoSetting = application.dao_setting;
      this.members = application.dao_setting?.members;
      if (!application || !application.service || !application.dao_setting) {
        this.pushBackHome(`Invalid service type!`);
        return;
      } else if (!applicationStore.isApplicationOwner && application.status == "draft") {
        this.pushBackHome(`Appplication not available!`);
        return;
      } else if ((!application.isCustomized || !application.theme) && !this.isReview) {
        appProvider.router.replace(
          `/customize-interface?type=${application.service}&appId=${application.appId}`
        );
        return;
      }

      this.proposals = application.proposals;
      if (this.isReview) return;
      this.applicationStore.setupThemeConfig(application.theme);
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
      console.log("fetchDefaultProposals");

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

  fetchUserInteract = flow(function* (this, walletAddress) {
    try {
      loadingController.increaseRequest();
      const proposalIds = applicationStore.application?.proposals.map((proposal) => proposal.id);
      const votes = yield apiService.votes.find({
        "user.address": walletAddress,
        proposal_in: proposalIds,
      });
      const comments = yield apiService.comments.find({
        "user.address": walletAddress,
        proposal_in: proposalIds,
      });

      if (!votes || votes.length == 0 || !comments || comments.length == 0) {
        snackController.error(`User dont have any infomation in this proposal`);
        return;
      }
      this.votes = votes;
      this.comments = comments;
      this.votesAmount = votes.reduce((a, b) => a + Number.parseInt(b.amount), 0);
      this.votesYes = votes.filter((votes) => {
        if (votes.vote === true) {
          return true;
        }
        return false;
      }).length;
      this.votesNo = votes.filter((votes) => {
        if (votes.vote === false) {
          return true;
        }
        return false;
      }).length;
      this.numberOfVotes = this.votesYes + this.votesNo;
    } catch (err: any) {
      console.error("err", err);
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });
  updateDaoSetting = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const { application, setting } = yield apiService.daoSettings.update(this.daoSetting.id, {
        name: this.daoSetting.name,
        type: this.daoSetting.type,
        isExisted: this.daoSetting.isExisted,
        tokenAddress: this.daoSetting.tokenAddress,
        threshold: this.daoSetting.threshold,
        weight: this.daoSetting.weight,
        isCouncil: this.daoSetting.isCouncil,
        council: {
          councilTokenAddress: this.daoSetting.tokenAddress,
          councilApprovalQuorum: this.councilApprovalQuorum,
        },
        members: this.members,
        otherSetting: {
          //TODO: Add program
          minAmountToCreate: this.minAmountToCreate,
          communityMintFactor: this.communityMintFactor,
        },
      });
      //TODO: Add to localstorage
      snackController.success("Update Dao successfully!");
      // appProvider.router.push("/dao/" + application.appId);
      appProvider.router.push("/management/");
    } catch (err: any) {
      snackController.commonError(err);
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
  @action setConfig(val: boolean) {
    this.pickConfig = val;
  }
  @action setAddMembers(val: boolean) {
    this.pickAddMembers = val;
  }
  @action setpickDao(val: boolean) {
    this.pickDao = val;
  }
  @action setReviewPage(val: string) {
    this.reviewPage = val;
  }
  @action changeAddProposalDialog() {
    this.isOpenAddProposal = !this.isOpenAddProposal;
  }
  @action backSolendDao() {
    this.proposalID = 0;
  }
  @action removeTransaction(index) {
    this.proposalTransactions.splice(index, 1);
  }
  @action addTransaction() {
    this.proposalTransactions.push({
      type: "None",
      source: "",
      destination: "",
      explorer: "",
      config: {},
      token: "",
      amount: 0,
    });
  }
  @action addMember() {
    this.members.push({
      wallet: this.memberAddress,
      isYou: this.memberAddress === this.daoSetting.tokenAddress ? true : false,
    });
    this.updateDaoSetting();
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
        !proposal.title.toLowerCase().includes(this.searchKey.toLowerCase()) &&
        !proposal.description.toLowerCase().includes(this.searchKey.toLowerCase())
      )
        return false;
      if (this.filterCancelled && proposal.status == "cancelled") return true;
      if (this.filterPassed && proposal.status == "passed") return true;
      if (this.filterFailed && proposal.status == "failed") return true;
      if (this.filterExecuting && proposal.status == "executing") return true;
      if (this.filterOnHold && proposal.status == "onHold") return true;
      if (this.filterVoting && proposal.status == "voting") return true;
      if (this.filterDraft && proposal.status == "draft" && applicationStore.isApplicationOwner) return true;
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
    return this.proposals[0];
  }

  @computed get daoType() {
    if (!this.daoSetting) return "";
    switch (this.daoSetting.type) {
      case "multi-sig":
        return "Multi-Signature Wallet";
      case "nft-dao":
        return "NFT Community DAO";
      case "community-dao":
        return "Community Token DAO";
      default:
        return "";
    }
  }

  @computed get daoMembers() {
    const members = [applicationStore.application?.user.address];
    if (!this.daoSetting || !this.daoSetting.members) return members;
    return members.concat(this.daoSetting.members);
  }
}
