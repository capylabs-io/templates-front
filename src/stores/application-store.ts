import { ThemeModel } from "../models/theme-model";
import vuetify from "@/plugins/vuetify";
import { action, computed, observable, runInAction, flow, makeAutoObservable } from "mobx";
import defaultLayoutConfig from "@/config/defaultLayoutConfig.json";
import { ApplicationModel } from "@/models/application-model";
import { get } from "lodash";
import { walletStore } from "./wallet-store";
import { DaoSettingModel } from "@/models/dao-setting-model";
export class ApplicationStore {
  @observable application?: ApplicationModel;
  @observable daoSetting?: DaoSettingModel;
  @observable themeConfig?: ThemeModel;
  @observable metadata?: any;

  //Theme Config
  @observable isDarkTheme = true;
  @observable isNavDarkTheme = true;

  @observable backgroundUrl?: string;
  @observable cardColor?: string;
  @observable accentColor?: string;
  @observable navColor?: string;
  @observable primaryColors?: string[];
  @observable fonts?: string[];

  //Metadata
  @observable primaryColor!: string;
  @observable layout: number = 1;
  @observable font?: string;
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

  //Temp files
  @observable tokenIconFile?: any = null;
  @observable brandLogoFile?: any = null;
  @observable bannerFile?: any = null;
  @observable sideBannerFile?: any = null;

  defaultLayoutConfig = defaultLayoutConfig;

  @action setPrimaryColor(val: string) {
    this.primaryColor = val;
  }

  @action setupThemeConfig(theme: ThemeModel) {
    this.themeConfig = theme;

    this.isDarkTheme = get(theme, "isDarkTheme", true);
    this.isNavDarkTheme = get(theme, "isDarkNav", true);
    this.fonts = get(theme, "fonts", applicationStore.defaultLayoutConfig.defaultFonts);
    this.primaryColors = get(
      theme,
      "primaryColors",
      applicationStore.defaultLayoutConfig.defaultPrimaryColors
    );
    if (!this.primaryColors?.includes(this.primaryColor) && this.primaryColors)
      this.primaryColor = this.primaryColors[0];

    this.backgroundUrl = get(
      theme,
      "backgroundUrl",
      this.isDarkTheme
        ? defaultLayoutConfig.defaultColors.darkBackground
        : defaultLayoutConfig.defaultColors.lightBackground
    );
    this.cardColor = get(
      theme,
      "cardColor",
      this.isDarkTheme
        ? defaultLayoutConfig.defaultColors.darkCardBackground
        : defaultLayoutConfig.defaultColors.lightCardBackground
    );
    this.navColor = get(
      theme,
      "navColor",
      this.isDarkTheme
        ? defaultLayoutConfig.defaultColors.darkCardBackground
        : defaultLayoutConfig.defaultColors.lightCardBackground
    );
    this.accentColor = get(
      theme,
      "accentColor",
      this.isDarkTheme
        ? defaultLayoutConfig.defaultColors.darkBackground
        : defaultLayoutConfig.defaultColors.lightBackground
    );
  }

  @action setupMetadata(metadata: any) {
    this.metadata = metadata;

    this.layout = get(metadata, "layout", 1);
    this.primaryColor = get(metadata, "primaryColor", this.primaryColors![0]);
    if (this.primaryColors && this.primaryColors.findIndex((color) => color == this.primaryColor) == -1)
      this.primaryColor = this.primaryColors![0];

    this.font = get(metadata, "font", this.fonts![0]);
    if (this.fonts && this.fonts.findIndex((font) => font == this.font) == -1) this.font = this.fonts![0];

    this.tokenIconPath = get(metadata, "img.tokenIcon", null);
    this.brandLogoPath = get(metadata, "img.brandLogo", null);
    this.bannerPath = get(metadata, "img.banner", null);
    this.sideBannerPath = get(metadata, "img.sideBanner", null);
    this.socialMedias = get(metadata, "socialMedias", []);
  }

  @computed get defaultPageBackground() {
    return defaultLayoutConfig.defaultColors.darkBackground;
  }

  @computed get pageBackground() {
    return this.isDarkTheme
      ? defaultLayoutConfig.defaultColors.darkBackground
      : defaultLayoutConfig.defaultColors.lightBackground;
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
    return this.sideBannerFile || this.sideBannerPath;
  }
  @computed get tokenIcon() {
    return this.tokenIconFile || this.tokenIconPath;
  }
  @computed get brandLogo() {
    return this.brandLogoFile || this.brandLogoPath;
  }

  @computed get isApplicationOwner() {
    if (!walletStore.connected) return false;
    if (!this.application) return false;
    return (
      walletStore.userId == (this.application?.user as unknown) ||
      walletStore.userId == this.application?.user.id
    );
  }

  @computed get applicationOwner() {
    if (!this.application || !this.application.user) return "Unknown Wallet";
    return this.application?.user.address;
  }

  @computed get daoToken() {
    if (!this.application || !this.daoSetting) return;
    return this.daoSetting.token;
  }
}

export const applicationStore = new ApplicationStore();
