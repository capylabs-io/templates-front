import { ApplicationModel } from "./../../../models/application-model";
import { action, flow, observable, runInAction } from "mobx";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { appProvider } from "@/app-providers";
import { walletStore } from "@/stores/wallet-store";
import { apiService } from "@/services/api-service";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { Watch } from "vue-property-decorator";

export class CustomizeInterfaceViewmodel {
  @observable application?: ApplicationModel;
  @observable metadata?: any;
  @observable appType?: string;

  @observable selectedPage?: string = "management";

  @observable isChoosingTheme = true;
  @observable themeConfig?: any;

  @observable sortBy: any = ["All", "Free", "Premium"];
  @observable searchKey?: string;

  @observable page?: number = 1;
  @observable totalPage?: number = 1;

  @observable drawer = true;
  @observable primaryColor?: string;

  @observable font?: string;
  @observable layout: number = 1;
  @observable tokenIcon?: any = null;
  @observable brandLogo?: any = null;
  @observable banner?: any = null;
  @observable sideBanner?: any = null;

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

      if (!this.application.service || this.application.service != query.type)
        this.pushBackHome(`Invalid service type!`);
      if (!this.application.isCustomized) this.isChoosingTheme = true;
      this.appType = query.type;
    } catch (err: any) {
      this.pushBackHome(`Error occurred, please try again later!`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action pushBackHome(error: any) {
    snackController.commonError(error);
    if (walletStore.connected) appProvider.router.replace("/management");
    else appProvider.router.replace("/home");
  }

  @action setChoosingTheme(value: boolean) {
    this.isChoosingTheme = value;
  }

  @action setThemeConfig(value: any) {
    this.themeConfig = value;
  }

  get appMainPages() {
    if (!this.appType) return [];
    switch (this.appType) {
      case "dao":
        return [
          {
            title: "DAO Management",
            value: "management",
          },
          {
            title: "Proposal Detail",
            value: "proposal",
          },
        ];
    }
  }
}
