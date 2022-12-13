import vuetify from "@/plugins/vuetify";
import { action, computed, observable, runInAction, flow, makeAutoObservable } from "mobx";

export class LayoutStore {
  @observable isDarkTheme = true;
  @observable _primaryColor?: string;
  @observable layout: number = 1;
  @observable font?: string;

  @observable tokenIcon?: any = null;
  @observable brandLogo?: any = null;
  @observable banner?: any = null;
  @observable sideBanner?: any = null;

  @action setPrimaryColor(val: string) {
    this._primaryColor = val;
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
}

export const layoutStore = new LayoutStore();
