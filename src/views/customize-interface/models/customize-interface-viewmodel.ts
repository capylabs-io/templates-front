import { get } from "lodash-es";
import { ThemeModel } from "./../../../models/theme-model";
import { layoutStore } from "./../../../stores/layout-store";
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
  @observable themeConfig?: ThemeModel;

  @observable themes?: ThemeModel[];
  @observable themeTypes: any = ["All", "Free", "Paid"];
  @observable sortBy?: string = "All";
  @observable searchKey?: string;
  @observable themePage?: number = 1;
  @observable themePerPage?: number = 9;

  @observable socialMediaForm?: boolean = false;

  layoutStore = layoutStore;

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
    formdata.append("appId", layoutStore.application!.appId.toString());
    formdata.append("name", name);

    return await apiService.uploadApplicationFile(formdata);
  }

  updateApplicationMetadata = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const application = layoutStore.application;
      const [tokenIconPath, bannerPath, sideBannerPath, brandLogoPath] = yield Promise.all([
        this.uploadApplicationFile(layoutStore.tokenIconFile, "TokenIcon"),
        this.uploadApplicationFile(layoutStore.bannerFile, "Banner"),
        this.uploadApplicationFile(layoutStore.sideBannerFile, "SideBanner"),
        this.uploadApplicationFile(layoutStore.brandLogoFile, "BrandLogo"),
      ]);
      yield apiService.updateAppMetadata({
        appId: application!!.appId,
        isDarkTheme: layoutStore.isDarkTheme,
        isNavDarkTheme: layoutStore.isNavDarkTheme,
        primaryColor: layoutStore.primaryColor,
        layout: layoutStore.layout,
        font: layoutStore.font,
        img: {
          tokenIcon: tokenIconPath ? tokenIconPath.url : layoutStore.tokenIconPath,
          banner: bannerPath ? bannerPath.url : layoutStore.bannerPath,
          sideBanner: sideBannerPath ? sideBannerPath.url : layoutStore.sideBannerPath,
          brandLogo: brandLogoPath ? brandLogoPath.url : layoutStore.brandLogoPath,
        },
        socialMedias: layoutStore.socialMedias,
      });
      yield apiService.applications.update(application!.id, {
        theme: layoutStore.themeConfig?.id,
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
    this.layoutStore.themeConfig = value;
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

  @action changeBrandLogo(file: any) {
    layoutStore.brandLogoFile = file;
  }
  @action changeTokenIcon(file: any) {
    layoutStore.tokenIconFile = file;
  }
  @action changeBanner(file: any) {
    layoutStore.bannerFile = file;
  }
  @action changeSideBanner(file: any) {
    layoutStore.sideBannerFile = file;
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
