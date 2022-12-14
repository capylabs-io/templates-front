import { layoutStore } from "./../../../stores/layout-store";
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
  @observable socialMedias?: any = [
    {
      ...layoutStore.defaultLayoutConfig.mediaIcons.TelegramChannel,
      url: "",
    },
  ];

  @observable isChoosingTheme = true;
  @observable themeConfig?: any;
  @observable sortBy: any = ["All", "Free", "Premium"];
  @observable searchKey?: string;
  @observable page?: number = 1;
  @observable totalPage?: number = 1;

  @observable drawer = true;

  layoutStore = layoutStore;

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

  @action setAppType(val: string) {
    this.appType = val;
  }

  @action setPrimaryColor(val: string) {
    this.layoutStore.setPrimaryColor(val);
  }

  @action changeSocialMedia(index: number, val: any) {
    this.socialMedias[index] = {
      ...val,
      url: this.socialMedias[index].url,
    };
  }

  @action changeSocialMediaUrl(index: number, val: string) {
    this.socialMedias[index].url = val;
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
