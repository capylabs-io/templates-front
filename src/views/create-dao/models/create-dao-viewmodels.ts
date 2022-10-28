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
  @observable page?: number = 0;
  @observable totalPage?: number = 1;
  // @observable members?: any = [
  //   {
  //     wallet: "0x20C07DaDc0AB5219246BCac518b56F4212380538",
  //     isYou: true,
  //   },
  // ];
  @observable members?: any = [];

  @action.bound changeCurrentStep(value: number) {
    this.currentStep = value;
  }
  @action.bound changeTotalStep(value: number) {
    this.totalStep = value;
  }
}
