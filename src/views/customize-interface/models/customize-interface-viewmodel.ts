import { get } from "lodash-es";
import { ThemeModel } from "./../../../models/theme-model";
import { applicationStore } from "../../../stores/application-store";
import { ApplicationModel } from "./../../../models/application-model";
import { action, computed, flow, observable, runInAction } from "mobx";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { appProvider } from "@/app-providers";
import { walletStore } from "@/stores/wallet-store";
import { apiService } from "@/services/api-service";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { Watch } from "vue-property-decorator";

export class CustomizeInterfaceViewmodel {
  @observable appType?: string;
  @observable selectedPage?: string = "management";

  @observable isChoosingTheme = false;
  @observable isChoosingParams = false;
  @observable themeConfig?: ThemeModel;

  @observable themes?: ThemeModel[];
  @observable themeTypes: any = ["All", "Free", "Paid"];
  @observable sortBy?: string = "All";
  @observable searchKey?: string;
  @observable themePage?: number = 1;
  @observable themePerPage?: number = 9;

  @observable socialMediaForm?: boolean = false;

  applicationStore = applicationStore;

  fetchThemes = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const themes = yield apiService.themes.find({
        _limit: -1,
      });
      if (!themes) {
        snackController.error(`No Themes Found!`);
        return;
      }
      this.themes = themes;
    } catch (err: any) {
      snackController.error(`Error occured! Error: ${err}`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  async uploadApplicationFile(file: any, name: string) {
    if (!file) return;
    const formdata = new FormData();
    formdata.append("files", file);
    formdata.append("appId", applicationStore.application!.appId.toString());
    formdata.append("name", name);

    return await apiService.uploadApplicationFile(formdata);
  }

  updateApplicationMetadata = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const application = applicationStore.application;
      const [tokenIconPath, bannerPath, sideBannerPath, brandLogoPath] = yield Promise.all([
        this.uploadApplicationFile(applicationStore.tokenIconFile, "TokenIcon"),
        this.uploadApplicationFile(applicationStore.bannerFile, "Banner"),
        this.uploadApplicationFile(applicationStore.sideBannerFile, "SideBanner"),
        this.uploadApplicationFile(applicationStore.brandLogoFile, "BrandLogo"),
      ]);
      yield apiService.updateAppMetadata({
        appId: application!!.appId,
        isDarkTheme: applicationStore.isDarkTheme,
        isNavDarkTheme: applicationStore.isNavDarkTheme,
        primaryColor: applicationStore.primaryColor,
        layout: applicationStore.layout,
        font: applicationStore.font,
        img: {
          tokenIcon: tokenIconPath ? tokenIconPath.url : applicationStore.tokenIconPath,
          banner: bannerPath ? bannerPath.url : applicationStore.bannerPath,
          sideBanner: sideBannerPath ? sideBannerPath.url : applicationStore.sideBannerPath,
          brandLogo: brandLogoPath ? brandLogoPath.url : applicationStore.brandLogoPath,
        },
        socialMedias: applicationStore.socialMedias,
      });
      yield apiService.applications.update(application!.id, {
        theme: applicationStore.themeConfig?.id,
      });
      snackController.success("Save config successfully!");
      appProvider.router.push({
        path: "/dao/" + application!!.appId.toString(),
      });
    } catch (err: any) {
      snackController.error(`Error occured! Error: ${err}`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action setChoosingTheme(value: boolean) {
    this.isChoosingTheme = value;
  }

  @action setThemeConfig(value: ThemeModel) {
    this.applicationStore.themeConfig = value;
  }

  @action setAppType(val: string) {
    this.appType = val;
  }

  @action setPrimaryColor(val: string) {
    this.applicationStore.setPrimaryColor(val);
  }

  @action addSocialMedia() {
    this.applicationStore.socialMedias.push({
      ...this.applicationStore.defaultLayoutConfig.mediaIcons.TelegramCommunity,
      url: "",
    });
  }

  @action removeSocialMedia(index: number) {
    this.applicationStore.socialMedias.splice(index, 1);
  }

  @action changeSocialMediaIcon(index: number, val: any) {
    this.applicationStore.socialMedias.splice(index, 1, {
      icon: val.icon || "",
      title: val.title || "",
      url: this.applicationStore.socialMedias[index].url,
    });
  }

  @action changeSocialMediaUrl(index: number, val: string) {
    this.applicationStore.socialMedias[index].url = val;
  }

  @action changeBrandLogo(file: any) {
    applicationStore.brandLogoFile = file;
  }
  @action changeTokenIcon(file: any) {
    applicationStore.tokenIconFile = file;
  }
  @action changeBanner(file: any) {
    applicationStore.bannerFile = file;
  }
  @action changeSideBanner(file: any) {
    applicationStore.sideBannerFile = file;
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

  @computed get filteredThemes() {
    let filteredThemes = this.themes;
    if (!this.themes) return [];
    if (this.sortBy != "All")
      filteredThemes = filteredThemes!.filter(
        (theme) => theme.type.toLowerCase() == this.sortBy?.toLowerCase()
      );
    if (this.searchKey)
      filteredThemes = this.themes.filter((app) =>
        app.name.toLowerCase().includes(this.searchKey!.toLowerCase())
      );
    return filteredThemes;
  }

  @computed get slicedThemes() {
    return this.filteredThemes!.slice(
      (this.themePage! - 1) * this.themePerPage!,
      this.themePage! * this.themePerPage!
    );
  }

  @computed get totalThemePage() {
    if (!this.themes) return 1;
    if (this.themes.length % this.themePerPage! == 0) return this.themes.length / this.themePerPage!;
    else return Math.floor(this.themes.length / this.themePerPage!) + 1;
  }
}
