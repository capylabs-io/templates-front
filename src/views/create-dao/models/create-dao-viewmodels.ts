import { apiService } from "./../../../services/api-service";
import { snackController } from "./../../../components/snack-bar/snack-bar-controller";
import { loadingController } from "./../../../components/global-loading/global-loading-controller";
import { walletStore } from "@/stores/wallet-store";
import { action, computed, flow, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import Web3 from "web3";
import { appProvider } from "@/app-providers";
export class CreateDaoViewModel {
  @observable currentStep: number = 1;
  @observable totalStep: number = 1;

  @observable isCommunityToken = true;
  @observable daoName?: string;
  @observable daoType?: string;

  @observable isAbsoluteOption = false;
  @observable isChooseTokenAdvance = false;
  @observable isCreateNewToken = true;
  @observable tokenAddress?: string;

  @observable minAmountToCreate?: number = 1000000;
  @observable communityMintFactor?: number = 1;

  @observable isCouncilUse = true;
  @observable councilTokenAddress?: string;
  @observable councilApprovalQuorum?: number = 60;

  @observable approvalThreshold?: number = 65;
  @observable membersString?: string;
  @observable members?: any;
  @observable memberPage?: number = 1;
  memberPerPage?: number = 10;

  @observable setupWalletForm?: boolean;
  @observable chooseTokenForm?: boolean;
  @observable createNewDaoForm1?: boolean;
  @observable createNewDaoForm2?: boolean;

  constructor() {}

  @action.bound changeCurrentStep(value: number) {
    this.currentStep = value;
  }
  @action.bound changeTotalStep(value: number) {
    this.totalStep = value;
  }
  @action.bound nextStep() {
    this.currentStep++;
    if (this.currentStep > this.totalStep) this.currentStep = this.totalStep;
  }
  @action.bound previousStep() {
    this.currentStep--;
    if (this.currentStep < 1) this.currentStep = 1;
  }
  @action.bound changeMemberString(val: string) {
    if (!val) return [];
    this.membersString = val;
    const wallets = [
      {
        wallet: walletStore.account,
        isYou: true,
      },
    ];
    const membersString = val.trim().replaceAll(/\s/g, "").split(",");
    for (let i = 0; i < membersString.length; i++) {
      const wallet = membersString[i];
      // if (Web3.utils.isAddress(wallet) && wallets.findIndex((member) => member.wallet == wallet) == -1)
      if (Web3.utils.isAddress(wallet))
        wallets.push({
          wallet,
          isYou: false,
        });
    }
    this.members = wallets.slice();
  }

  createApplication = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const { application, setting } = yield apiService.applications.create({
        userId: walletStore.userId,
        name: this.daoName,
        service: "dao",
        setting: {
          name: this.daoName,
          type: this.daoType,
          isExisted: this.isCreateNewToken,
          tokenAddress: this.tokenAddress,
          threshold: this.approvalThreshold,
          weight: this.isAbsoluteOption ? 1 : 0,
          isCouncil: this.isCouncilUse,
          council: {
            councilTokenAddress: this.councilTokenAddress,
            councilApprovalQuorum: this.councilApprovalQuorum,
          },
          members: this.members,
          otherSetting: {
            //TODO: Add program
            minAmountToCreate: this.minAmountToCreate,
            communityMintFactor: this.communityMintFactor,
          },
        },
      });
      //TODO: Add to localstorage
      snackController.success("Create Application successfully!");
      appProvider.router.push("/dao/" + application.appId);
    } catch (err: any) {
      snackController.commonError(err);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @computed get canNextStep() {
    if (this.isCommunityToken) return this.canNextStepCommunityToken;
    else return this.canNextStepMultiSig;
  }
  @computed get isLastStep() {
    return this.currentStep == this.totalStep;
  }
  @computed get canNextStepCommunityToken() {
    if (this.currentStep == 1) {
      if (this.isCreateNewToken) return true;
      return this.chooseTokenForm;
    } else if (this.currentStep == 2) return this.createNewDaoForm1;
    else if (this.currentStep == 3) {
      if (!this.isCouncilUse) return true;
      return this.createNewDaoForm2;
    } else if (this.currentStep == 4) return true;
    return false;
  }
  @computed get canNextStepMultiSig() {
    if (this.currentStep == 1) return this.setupWalletForm;
    else if (this.currentStep == 2 || this.currentStep == 3) return true;
    return false;
  }
  @computed get memberCount() {
    if (!this.members || this.members.length == 0) return 1;
    return this.members.length;
  }
  @computed get totalMemberPage() {
    if (!this.members || this.members.length == 0) return 1;
    if (this.memberCount % this.memberPerPage! == 0) return this.memberCount / this.memberPerPage!;
    else return Math.floor(this.memberCount / this.memberPerPage!) + 1;
  }
  @computed get pageMembers() {
    if (!this.members) return [];
    return this.members.slice(
      (this.memberPage! - 1) * this.memberPerPage!,
      this.memberPage! * this.memberPerPage!
    );
  }
}
