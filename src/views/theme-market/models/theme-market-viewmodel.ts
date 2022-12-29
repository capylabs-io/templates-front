import { ThemeModel } from "./../../../models/theme-model";
import { action, computed, flow, observable, runInAction } from "mobx";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { apiService } from "@/services/api-service";
import { snackController } from "@/components/snack-bar/snack-bar-controller";

export class ThemeMarketViewmodel {
  @observable themes?: ThemeModel[];
  @observable searchKey?: string;
  @observable themePage?: number = 1;
  @observable themePerPage?: number = 9;

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

  @computed get filteredThemes() {
    let filteredThemes = this.themes;
    if (!this.themes) return [];
    // if (this.sortBy != "All")
    //   filteredThemes = filteredThemes!.filter(
    //     (theme) => theme.type.toLowerCase() == this.sortBy?.toLowerCase()
    //   );
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
