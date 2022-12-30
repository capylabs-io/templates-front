import { confirmDialogController } from "./../../../components/confirm-dialog/confirm-dialog-controller";
import { ApplicationModel } from "@/models/application-model";
import { walletStore } from "@/stores/wallet-store";
import { apiService } from "@/services/api-service";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { computed, flow, observable } from "mobx";
import { ThemeModel } from "@/models/theme-model";

export class ThemeManagementViewmodel {
  @observable themes?: ThemeModel[];
  @observable themeTypes: any = ["All", "Free", "Paid"];
  @observable sortBy?: string = "All";
  @observable searchKey?: string;
  @observable themePage?: number = 1;
  @observable themePerPage?: number = 9;

  fetchThemes = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const freeThemes = yield apiService.themes.find({
        _limit: -1,
        type: "free",
      });
      const userThemes = walletStore.userPaidThemes;

      this.themes = freeThemes.concat(
        userThemes.filter((theme) => freeThemes.findIndex((item) => item.id == theme.id) < 0)
      );
    } catch (err: any) {
      snackController.error(`Error occured! Error: ${err}`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

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
