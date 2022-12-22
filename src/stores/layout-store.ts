import vuetify from "@/plugins/vuetify";
import { action, computed, observable, runInAction, flow, makeAutoObservable } from "mobx";
import defaultLayoutConfig from "@/config/defaultLayoutConfig.json";
import { ApplicationModel } from "@/models/application-model";
import { get } from "lodash";
export class LayoutStore {
  @observable application?: ApplicationModel;
  @observable themeConfig?: any;

  @observable isDarkTheme = true;
  @observable isNavDarkTheme = true;
  @observable _primaryColor?: string;
  @observable layout: number = 1;
  @observable font?: string = "Roboto";

  @observable tokenIconFile?: any = null;
  @observable brandLogoFile?: any = null;
  @observable bannerFile?: any = null;
  @observable sideBannerFile?: any = null;

  @observable tokenIconPath?: string;
  @observable brandLogoPath?: string;
  @observable bannerPath?: string;
  @observable sideBannerPath?: string;

  @observable socialMedias?: any = [
    {
      ...defaultLayoutConfig.mediaIcons.TelegramCommunity,
      url: "",
    },
  ];

  defaultLayoutConfig = defaultLayoutConfig;

  @action setPrimaryColor(val: string) {
    this._primaryColor = val;
  }

  @action setupLayoutConfig(metadata: any) {
    this.isDarkTheme = get(metadata, "isDarkTheme", true);
    this.isNavDarkTheme = get(metadata, "isNavDarkTheme", true);
    this.layout = get(metadata, "layout", 1);
    this._primaryColor = get(metadata, "primaryColor", "");
    this.font = get(metadata, "font", "Roboto");

    this.tokenIconPath = get(metadata, "img.tokenIcon", null);
    this.brandLogoPath = get(metadata, "img.brandLogo", null);
    this.bannerPath = get(metadata, "img.banner", null);
    this.sideBannerPath = get(metadata, "img.sideBanner", null);

    this.socialMedias = get(metadata, "socialMedias", []);
  }

  @computed get primaryColor() {
    if (!this._primaryColor) return vuetify.framework.theme.currentTheme.primary!.toString();
    return this._primaryColor;
  }

  @computed get pageBackground() {
    return this.isDarkTheme
      ? vuetify.framework.theme.currentTheme.darkBackground
      : vuetify.framework.theme.currentTheme.lightBackground;
  }

  @computed get cardBackground() {
    return this.isDarkTheme
      ? vuetify.framework.theme.currentTheme["gray12"]?.toString()
      : vuetify.framework.theme.currentTheme["gray1"]?.toString();
  }

  @computed get socialMediaIcons() {
    return Object.values(defaultLayoutConfig.mediaIcons);
  }

  socialMediaIcon(key: string) {
    return defaultLayoutConfig.mediaIcons[key].icon;
  }

  @computed get bannerName() {
    if (this.bannerFile) return this.bannerFile.name;
    else if (this.bannerPath) {
      const splited = this.bannerPath.split("/");
      return splited[splited.length - 1];
    }
    return "Choose Image";
  }
  @computed get sideBannerName() {
    if (this.sideBannerFile) return this.sideBannerFile.name;
    else if (this.sideBannerPath) {
      const splited = this.sideBannerPath.split("/");
      return splited[splited.length - 1];
    }
    return "Choose Image";
  }
  @computed get tokenIconName() {
    if (this.tokenIconFile) return this.tokenIconFile.name;
    else if (this.tokenIconPath) {
      const splited = this.tokenIconPath.split("/");
      return splited[splited.length - 1];
    }
    return "Choose Image";
  }
  @computed get brandLogoName() {
    if (this.brandLogoFile) return this.brandLogoFile.name;
    else if (this.brandLogoPath) {
      const splited = this.brandLogoPath.split("/");
      return splited[splited.length - 1];
    }
    return "Choose Image";
  }

  @computed get banner() {
    return this.bannerFile || this.bannerPath;
  }
  @computed get sideBanner() {
    return this.sideBannerFile || this.bannerPath;
  }
  @computed get tokenIcon() {
    return this.tokenIconFile || this.tokenIconPath;
  }
  @computed get brandLogo() {
    return this.brandLogoFile || this.brandLogoPath;
  }

  @computed get defaultBanner() {
    return this.defaultLayoutConfig.defaultImage.banner;
  }
}

export const layoutStore = new LayoutStore();
