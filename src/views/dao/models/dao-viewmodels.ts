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
  @observable application?: ApplicationModel;
  @observable metadata?: any;
  @observable daoSetting?: DaoSettingModel;

  @observable isOpenAddProposal = false;
  @observable instructionList = ["Instruction 1", "Instruction 2", "Instruction 3", "Instruction 3"];
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

  fetchApplication = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const query = appProvider.router.currentRoute.query;
      if (!query || !query.appId) this.pushBackHome("Application Id is required!");
      const appId = query.appId;
      //TODO: Wrong logic! no need userId
      const res = yield apiService.applications.find({
        appId,
        userId: walletStore.userId,
      });
      if (!res || !res.applications || res.applications.length == 0)
        this.pushBackHome("Application does not exist!");
      this.application = res.applications[0];
      this.metadata = this.application.metadata;
      this.daoSetting = this.application.dao_setting;
      if (!this.application.service || !this.daoSetting) this.pushBackHome(`Invalid service type!`);
      if (!this.application.isCustomized)
        appProvider.router.push(
          `/customize-interface?type=${this.application?.service}&appId=${this.application?.appId}`
        );
    } catch (err: any) {
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  pushBackHome(error: any) {
    snackController.commonError(error);
    if (walletStore.connected) appProvider.router.replace("/management");
    else appProvider.router.replace("/home");
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

  // computed
  // @computed get eventEndDate() {
  //   return moment(this.voteEnd).isBefore(now());
  // }
}
