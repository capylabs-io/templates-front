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
import { action, observable, computed, flow } from "mobx";
import moment, { now } from "moment";
import { snackController } from "@/components/snack-bar/snack-bar-controller";

export class ProposalDetailViewmodel {
  @observable isReview = false;
  @observable loading = false;

  @observable isVoted = false;
  @observable isVoteDone = false;
  @observable reviewPage: string = "management";

  @observable proposal?: ProposalModel;

  applicationStore = applicationStore;
  walletStore = walletStore;

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

      if (this.isReview) return;
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
      this.proposal = proposals[0];
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
}
