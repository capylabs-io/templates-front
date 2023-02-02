import { VoteModel } from "./../../../models/vote-model";
import { CommentModel } from "./../../../models/comment-model";
import { FixedNumber } from "@ethersproject/bignumber";
import { applicationStore } from "../../../stores/application-store";
import { ProposalModel } from "../../../models/proposal-model";
import { DaoSettingModel } from "../../../models/dao-setting-model";
import { walletStore } from "@/stores/wallet-store";
import { ApplicationModel } from "../../../models/application-model";
import { get } from "lodash-es";
import { apiService } from "../../../services/api-service";
import { appProvider } from "@/app-providers";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { action, observable, computed, flow, when, IReactionDisposer, reaction } from "mobx";
import moment, { now } from "moment";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { confirmDialogController } from "@/components/confirm-dialog/confirm-dialog-controller";
import { UserModel } from "@/models/user-model";
import { bnHelper } from "@/helpers/bignumber-helper";
import { localdata } from "@/helpers/local-data";

export class ProposalDetailViewmodel {
  _disposers: IReactionDisposer[] = [];

  applicationStore = applicationStore;
  walletStore = walletStore;

  @observable isResultShow = false;

  @observable isReview = false;
  @observable loading = false;

  @observable isVoteYes = false;
  @observable isVoteDone = false;
  @observable reviewPage: string = "management";

  @observable proposal?: ProposalModel;

  @observable isOpenVoteConfirm = false;
  @observable showVoteResult = false;
  @observable message = "";

  @observable myComment?: CommentModel;
  @observable myVote?: VoteModel;

  @observable votes?: VoteModel[];
  @observable comments?: CommentModel[];
  @observable commentPerPage = 8;
  @observable commentPage = 1;

  @observable voteAmount = "0";
  @observable confirmVoteForm = false;
  @observable voting = false;
  @observable owner?: UserModel;
  @observable filterYesResult = true;
  @observable filterNoResult = true;

  fetchProposal = flow(function* (this, proposalId) {
    try {
      loadingController.increaseRequest();
      const proposal = yield apiService.proposals.findOne(proposalId);
      if (!proposal || !proposal.application) {
        this.pushBackHome("Proposal does not exist!");
        return;
      }
      this.proposal = proposal;
      const application = proposal.application;
      this.applicationStore.application = proposal.application;

      if (!applicationStore.isApplicationOwner && application.status == "draft") {
        this.pushBackHome(`Appplication not available!`);
        return;
      } else if ((!application.isCustomized || !application.theme) && !this.isReview) {
        appProvider.router.replace(
          `/customize-interface?type=${application.service}&appId=${application.appId}`
        );
        return;
      }
      if (proposal.application && proposal.application.user)
        this.owner = yield this.fetchApplicationOwner(proposal.application.user);
      if (proposal.application && proposal.application["dao_setting"])
        applicationStore.daoSetting = yield this.fetchDaoSetting(proposal.application["dao_setting"]);

      if (this.isReview) return;
      walletStore.loadUserBalance();

      const theme = yield apiService.themes.findOne(application.theme);
      if (theme) this.applicationStore.setupThemeConfig(theme);
      this.applicationStore.setupMetadata(application.metadata);
    } catch (err: any) {
      console.error("err", err);
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  fetchApplicationOwner = async (userId) => {
    try {
      loadingController.increaseRequest();
      return (await apiService.users.findOne(userId)) as UserModel;
    } catch (err: any) {
      console.error("err", err);
    } finally {
      loadingController.decreaseRequest();
    }
  };

  fetchDaoSetting = async (daoSettingId) => {
    try {
      loadingController.increaseRequest();
      return (await apiService.daoSettings.findOne(daoSettingId)) as DaoSettingModel;
    } catch (err: any) {
      console.error("err", err);
    } finally {
      loadingController.decreaseRequest();
    }
  };

  fetchDefaultProposals = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const proposals = yield apiService.getDefaultProposal();
      this.proposal = proposals[0];
    } catch (err: any) {
      console.error("err", err);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  fetchVotes = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      if (!this.proposal) {
        this.pushBackHome(`Error occurred, please try again later!`);
        return;
      }
      const votes = yield apiService.votes.find({
        proposal: this.proposal.id,
      });
      if (!votes || votes.length == 0) return;
      this.votes = votes;
      const myVotes = this.votes.filter((vote) => vote.user.id == walletStore.userId);
      if (myVotes && myVotes.length > 0) this.myVote = myVotes[0];
      if (this.myVote && this.myVote.comment) this.myComment = this.myVote.comment;
    } catch (err: any) {
      console.error("err", err);
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  fetchComments = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      if (!this.proposal) {
        this.pushBackHome(`Error occurred, please try again later!`);
        return;
      }
      const comments = yield apiService.comments.find({
        proposal: this.proposal.id,
      });
      if (!comments) return;
      this.comments = comments;
    } catch (err: any) {
      console.error("err", err);
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  sendComment = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const model = {
        userId: this.walletStore.userId,
        proposalId: this.proposal.id,
        content: this.message,
      };
      yield apiService.comments.create(model);
      yield this.fetchVotes();
      yield this.fetchComments();
      snackController.success("Send message successfully!");
    } catch (err: any) {
      console.error(err.message || err);
      snackController.error("Error occurred! Please try again later.");
    } finally {
      loadingController.decreaseRequest();
    }
  });

  sendVote = flow(function* (this) {
    try {
      this.voting = true;
      const model = {
        userId: this.walletStore.userId,
        proposalId: this.proposal.id,
        voteType: this.isVoteYes, // true = yes, false = no
        amount: this.voteAmount,
      };
      yield apiService.votes.create(model);
      walletStore.minusUserBalance(this.voteAmount);
      this.isVoteDone = true;
      this.isOpenVoteConfirm = false;
      yield this.fetchVotes();
      snackController.success(`Vote successfully! You have voted ${this.isVoteYes ? "YES" : "NO"}`);
    } catch (err: any) {
      console.error(err.message || err);
      snackController.error("Error occurred! Please try again later.");
    } finally {
      this.voting = false;
    }
  });

  @action.bound deleteProposal() {
    confirmDialogController.confirm({
      title: "Confirm Delete Proposal",
      content: `Are you sure you want to remove proposal <span class='font-weight-bold white--text'>${this.proposal?.title}</span>? 
        <div class='error--text mt-1'>This proposal will be deleted pernamently and it cannot be restored!</div>`,
      doneText: "Remove",
      doneCallback: async () => {
        await this.processDeleteProposal();
      },
    });
  }

  processDeleteProposal = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const removedProposal = yield apiService.proposals.delete(this.proposal?.id);
      snackController.success(`Remove proposal ${removedProposal.title} successfully!`);
      appProvider.router.push(`/dao/${removedProposal.application.appId}`);
    } catch (err: any) {
      console.error(err.message || err);
      snackController.error("Error occurred! Please try again later.");
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action.bound releaseVotedToken() {
    confirmDialogController.confirm({
      title: "Confirm Release Token",
      content: `Are you sure you want to release your token? <div class='error--text mt-1'>Once your token released, your comment will be deleted and you can write new comment after voting again!</div>`,
      doneText: "Release",
      doneCallback: async () => {
        await this.processReleaseToken();
      },
    });
  }

  processReleaseToken = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      if (!this.myVote) return;
      walletStore.addUserBalance(this.myVote.amount);
      if (this.isCommented) yield apiService.comments.delete(this.myComment!.id);
      yield apiService.votes.delete(this.myVote?.id);
      this.resetVotes();
      this.resetComments();
      yield this.fetchVotes();
      yield this.fetchComments();
      snackController.success(`Release token successfully!`);
    } catch (err: any) {
      console.error(err.message || err);
      snackController.error("Error occurred! Please try again later.");
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action.bound publishProposal() {
    confirmDialogController.confirm({
      title: "Confirm Publish Proposal",
      content: `Are you sure you want to publish proposal <span class='font-weight-bold white--text'>${this.proposal?.title}</span>? 
        <div class='warning--text mt-1'>Please review carefully before publishing your final version. Once published, you can no longer edit the proposal!</div>`,
      doneText: "Publish",
      showWarningIcon: false,
      doneCallback: async () => {
        await this.processPublishProposal();
      },
    });
  }

  @action.bound toggleVoteResult() {
    this.isResultShow = !this.isResultShow;
  }

  processPublishProposal = flow(function* (this) {
    try {
      const updatedProposal = yield apiService.proposals.update(this.proposal?.id, {
        status: "voting",
      });
      snackController.success(`Publish proposal ${updatedProposal.title} successfully!`);
      yield this.fetchProposal(updatedProposal.id);
    } catch (err: any) {
      console.error(err.message || err);
      snackController.error("Error occurred! Please try again later.");
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action.bound cancelProposal() {
    confirmDialogController.confirm({
      title: "Confirm Publish Proposal",
      content: `Are you sure you want to cancel proposal <span class='font-weight-bold white--text'>${this.proposal?.title}</span>? 
        <div class='error--text mt-1'>Once proposal cancelled, you cannot restore it.</div>`,
      doneText: "Cancel Proposal",
      cancelText: "Abort",
      warningIconColor: "error",
      doneCallback: async () => {
        await this.processCancelProposal();
      },
    });
  }

  processCancelProposal = flow(function* (this) {
    try {
      const updatedProposal = yield apiService.proposals.update(this.proposal?.id, {
        status: "cancelled",
      });
      snackController.success(`Publish proposal ${updatedProposal.title} successfully!`);
      yield this.fetchProposal(updatedProposal.id);
    } catch (err: any) {
      console.error(err.message || err);
      snackController.error("Error occurred! Please try again later.");
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action resetComments() {
    this.comments = [];
    this.myComment = undefined;
  }

  @action resetVotes() {
    this.votes = [];
    this.myVote = undefined;
  }

  @action pushBackHome(error: any) {
    snackController.error(error);
    if (walletStore.connected) appProvider.router.replace("/management");
    else appProvider.router.replace("/home");
  }

  @action setIsReview(val: boolean) {
    this.isReview = val;
  }

  @action openVoteConfirm(isVoteYes = false) {
    this.isVoteYes = isVoteYes;
    this.isOpenVoteConfirm = true;
  }

  @action closeVoteConfirm() {
    this.isOpenVoteConfirm = false;
    this.voteAmount = "0";
  }

  @action voteExcute() {
    this.isVoteDone = true;
  }
  @action gotoVoteResult() {
    this.showVoteResult = true;
  }
  @action backPropoDetail() {
    this.showVoteResult = false;
  }

  @computed get isVoted() {
    return this.myVote;
  }

  @computed get isCommented() {
    return this.myComment;
  }

  @computed get voteEndTime() {
    return this.proposal?.endTimeVote;
  }
  @computed get commentLength() {
    if (!this.comments) return 0;
    return this.comments?.length;
  }

  @computed get totalCommentPage() {
    if (!this.comments || this.comments.length == 0) return 1;
    if (this.comments.length % this.commentPerPage! == 0) return this.comments.length / this.commentPerPage!;
    else return Math.floor(this.comments.length / this.commentPerPage!) + 1;
  }

  @computed get slicedComments() {
    if (!this.comments) return [];
    let comments = this.comments;
    if (this.isCommented) comments = this.comments.filter((comment) => comment.id != this.myComment!.id);
    return comments.slice(
      (this.commentPage - 1) * this.commentPerPage,
      this.commentPage * this.commentPerPage
    );
  }

  @computed get totalYesVotes() {
    if (!this.votes) return FixedNumber.from(0);
    return this.votes.reduce((acc, vote) => {
      if (vote.vote) acc = acc.addUnsafe(FixedNumber.from(vote.amount));
      return acc;
    }, FixedNumber.from(0));
  }

  @computed get totalNoVotes() {
    if (!this.votes) return FixedNumber.from(0);
    return this.votes.reduce((acc, vote) => {
      if (!vote.vote) acc = acc.addUnsafe(FixedNumber.from(vote.amount));
      return acc;
    }, FixedNumber.from(0));
  }

  @computed get totalVoteAmount() {
    if (!this.votes) return FixedNumber.from(0);
    return this.totalYesVotes.addUnsafe(this.totalNoVotes);
  }

  @computed get totalYesPercent() {
    if (!this.votes || this.totalYesVotes.isZero()) return FixedNumber.from(0);
    return this.totalYesVotes.divUnsafe(this.totalVoteAmount).mulUnsafe(FixedNumber.from(100));
  }

  @computed get totalNoPercent() {
    if (!this.votes || this.totalNoVotes.isZero()) return FixedNumber.from(0);
    return this.totalNoVotes.divUnsafe(this.totalVoteAmount).mulUnsafe(FixedNumber.from(100));
  }

  @computed get top10Votes() {
    if (!this.votes) return [];
    return this.votes
      .filter((vote) => {
        if (this.filterYesResult && !this.filterNoResult && !vote.vote) return false;
        if (this.filterNoResult && !this.filterYesResult && vote.vote) return false;
        return true;
      })
      .sort((b, a) => this.sortByAmount(a, b))
      .slice(0, 10)
      .map((vote) => {
        return {
          ...vote,
          percentage: FixedNumber.from(vote.amount)
            .divUnsafe(this.totalVoteAmount)
            .mulUnsafe(FixedNumber.from(100))
            .toUnsafeFloat(),
        };
      });
  }

  @computed get top10Labels() {
    if (!this.votes) return [];
    const labels = this.top10Votes.map((vote) => vote.user.address);
    if (this.votes.length < 11) return labels;
    return labels.push("Other");
  }

  @computed get top10Amounts() {
    if (!this.votes) return [];
    const amounts = this.top10Votes.map((vote) => vote.percentage);
    if (this.votes.length < 11) return amounts;
    const totalPercentage = amounts.reduce((amount, acc) => {
      return (acc += amount);
    }, 0);
    return amounts.push(100 - totalPercentage);
  }

  sortByAmount(a: VoteModel, b: VoteModel) {
    const minus = FixedNumber.from(a.amount).subUnsafe(FixedNumber.from(b.amount));
    if (bnHelper.lt(minus, FixedNumber.from("0"))) return -1;
    else if (bnHelper.gt(minus, FixedNumber.from("0"))) return 1;
    else return 0;
  }

  @computed get ownerAddress() {
    if (!this.owner) return "Unknown Wallet";
    return this.owner.address;
  }

  @computed get isDraft() {
    if (!this.proposal || !this.proposal.status) return true;
    return this.proposal.status == "draft";
  }
}
