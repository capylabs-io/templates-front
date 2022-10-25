import { action, observable } from "mobx";

export class CreateDaoViewModel {
  @observable currentStep: number = 1;
  @observable totalStep: number = 1;

  @observable isCommunityToken = true;

  @observable isAbsoluteOption = false;
  @observable isChooseTokenAdvance = false;
  @observable isCreateNewToken = true;
  @observable tokenAddress?: string;

  @observable minAmountToCreate?: number = 1000000;
  @observable communityMintFactor?: number = 1;
  @observable daoName?: string;

  @observable isCouncilUse = true;
  @observable councilTokenAddress?: string;
  @observable councilApprovalQuorum?: number = 60;

  @observable memberCount?: number = 1;
  @observable memberText?: number = 60;

  @action.bound changeCurrentStep(value: number) {
    this.currentStep = value;
  }
  @action.bound changeTotalStep(value: number) {
    this.totalStep = value;
  }
}
