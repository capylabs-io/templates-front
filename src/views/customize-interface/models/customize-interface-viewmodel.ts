import { ApplicationModel } from "./../../../models/application-model";
import { action, flow, observable } from "mobx";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { appProvider } from "@/app-providers";
import { walletStore } from "@/stores/wallet-store";
import { apiService } from "@/services/api-service";
import { snackController } from "@/components/snack-bar/snack-bar-controller";

export class CustomizeInterfaceViewmodel {
  @observable application?: ApplicationModel;
  @observable metadata?: any;

  @observable isChoosingTheme = true;
  @observable themeConfig?: any;

  @observable sortBy: any = ["All", "Free", "Premium"];
  @observable searchKey?: string;

  @observable page?: number = 1;
  @observable totalPage?: number = 1;

  @observable primaryColor?: string;
  @observable backgroundColor?: string = "#6A49E2";
  @observable drawer = true;

  @observable mediaIcons = [
    {
      icon: "mdi-twitter",
      value: "twitter",
    },
    {
      icon: "mdi-facebook",
      value: "facebook",
    },
    {
      icon: "mdi-discord",
      value: "discord",
    },
    {
      icon: "mdi-telegram",
      value: "telegram",
    },
  ];

  swatches = [
    ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5"],
    ["#8b5aff", "#a27bff", "#b99cff", "#d0bdff", "#e8deff"],
    ["#51e5db", "#74ebe3", "#96f0ea", "#b9f5f1", "#dcfaf8"],
    ["#ffa51a", "#ffb748", "#ffc976", "#ffdba3", "#ffedd1"],
  ];

  fetchApplication = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const query = appProvider.router.currentRoute.query;
      if (!walletStore.connected) this.pushBackHome("You need to connect wallet to manage application!");
      if (!query || !query.appId || !query.type)
        this.pushBackHome("Application Id and Service Type are required!");
      const appId = query.appId;
      const res = yield apiService.applications.find({
        appId,
        userId: walletStore.userId,
      });
      if (!res || !res.applications || res.applications.length == 0)
        this.pushBackHome("Application does not exist!");
      this.application = res.applications[0];
      this.metadata = this.application.metadata;

      console.log(`query type ${query.type}`);
      console.log(`application service ${this.application.service}`);

      if (!this.application.service || this.application.service != query.type)
        this.pushBackHome(`Invalid service type!`);
      if (!this.application.isCustomized) this.isChoosingTheme = true;
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

  @action setBackgroundColor(color: string) {
    this.backgroundColor = color;
  }

  @action setChoosingTheme(value: boolean) {
    this.isChoosingTheme = value;
  }

  @action setThemeConfig(value: any) {
    this.themeConfig = value;
  }
}
