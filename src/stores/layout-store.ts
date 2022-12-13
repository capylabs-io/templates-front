import { action, computed, observable, runInAction, flow, makeAutoObservable } from "mobx";

export class LayoutStore {
  @observable isReview: boolean = false;
  @observable primaryColor?: string;

  @observable font?: string;
  @observable layout: number = 1;
  @observable tokenIcon?: any = null;
  @observable brandLogo?: any = null;
  @observable banner?: any = null;
  @observable sideBanner?: any = null;
}

export const layoutStore = new LayoutStore();
