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
  @observable appType?: string;
  @observable selectedPage?: string = "management";

  @observable isChoosingTheme = true;
  @observable themeConfig?: any;
  @observable sortBy: any = ["All", "Free", "Premium"];
  @observable searchKey?: string;
  @observable page?: number = 1;
  @observable totalPage?: number = 1;

  @observable layoutForm?: boolean = false;

  layoutStore = layoutStore;

  async uploadApplicationFile(file: any, name: string) {
    if (!file) return;
    const formdata = new FormData();
    formdata.append("files", file);
    formdata.append("appId", layoutStore.application!.appId.toString());
    formdata.append("name", name);

    return await apiService.uploadApplicationFile(formdata);
  }

  updateApplicationMetadata = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const application = layoutStore.application;
      const [tokenIconPath, bannerPath, sideBannerPath, brandLogoPath] = yield Promise.all([
        this.uploadApplicationFile(layoutStore.tokenIcon, "TokenIcon"),
        this.uploadApplicationFile(layoutStore.banner, "Banner"),
        this.uploadApplicationFile(layoutStore.sideBanner, "SideBanner"),
        this.uploadApplicationFile(layoutStore.brandLogo, "BrandLogo"),
      ]);
      const res = yield apiService.updateAppMetadata({
        appId: application!!.appId,
        isDarkTheme: layoutStore.isDarkTheme,
        isNavDarkTheme: layoutStore.isNavDarkTheme,
        primaryColor: layoutStore.primaryColor,
        layout: layoutStore.layout,
        font: layoutStore.font,
        img: [
          {
            name: "tokenIcon",
            url: tokenIconPath ? tokenIconPath.url : "",
          },
          {
            name: "banner",
            url: bannerPath ? bannerPath.url : "",
          },
          {
            name: "sideBanner",
            url: sideBannerPath ? sideBannerPath.url : "",
          },
          {
            name: "brandLogo",
            url: brandLogoPath ? brandLogoPath.url : "",
          },
        ],
      });
      snackController.success("Save config successfully!");
      appProvider.router.push({
        path: "/dao",
        query: {
          appId: application!!.appId.toString(),
        },
      });
    } catch (err: any) {
      snackController.error(`Error occured! Error: ${err}`);
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

  @action setAppType(val: string) {
    this.appType = val;
  }

  @action setPrimaryColor(val: string) {
    this.layoutStore.setPrimaryColor(val);
  }

  @action addSocialMedia() {
    this.layoutStore.socialMedias.push({
      ...this.layoutStore.defaultLayoutConfig.mediaIcons.TelegramCommunity,
      url: "",
    });
  }

  @action removeSocialMedia(index: number) {
    console.log("Clicked");
    this.layoutStore.socialMedias.splice(index, 1);
  }

  @action changeSocialMediaIcon(index: number, val: any) {
    this.layoutStore.socialMedias.splice(index, 1, {
      icon: val.icon || "",
      title: val.title || "",
      url: this.layoutStore.socialMedias[index].url,
    });
  }

  @action changeSocialMediaUrl(index: number, val: string) {
    this.layoutStore.socialMedias[index].url = val;
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
