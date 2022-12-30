import { FixedNumber } from "@ethersproject/bignumber";
import { ThemeModel } from "./../../../models/theme-model";
import { action, computed, flow, observable, runInAction } from "mobx";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { apiService } from "@/services/api-service";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { walletStore } from "@/stores/wallet-store";

export class ThemeMarketViewmodel {
  @observable themes?: ThemeModel[];
  @observable searchKey?: string;
  @observable themePage?: number = 1;
  @observable themePerPage?: number = 9;

  @observable minPrice?: string;
  @observable maxPrice?: string;

  @observable isDao?: boolean = false;
  @observable isNFTMinter?: boolean = false;
  @observable isNFTStaking?: boolean = false;

  @observable isOwned?: boolean = false;
  @observable isFree?: boolean = false;
  @observable isNew?: boolean = false;
  @observable isOnSale?: boolean = false;
  @observable isTopSeller?: boolean = false;

  @observable isSilver?: boolean = false;
  @observable isGold?: boolean = false;
  @observable isPlatinum?: boolean = false;
  @observable isDiamond?: boolean = false;

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

  @action.bound resetFilters() {
    this.minPrice = "";
    this.maxPrice = "";
    this.isDao = false;
    this.isNFTMinter = false;
    this.isNFTStaking = false;
    this.isOwned = false;
    this.isFree = false;
    this.isNew = false;
    this.isOnSale = false;
    this.isTopSeller = false;
    this.isSilver = false;
    this.isGold = false;
    this.isPlatinum = false;
    this.isDiamond = false;
  }

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
    filteredThemes = filteredThemes!.filter((theme) => {
      if (this.minPrice && theme.type == "free") return false;
      if (this.maxPrice && theme.type == "free") return true;
      if (
        this.minPrice &&
        !FixedNumber.from(theme.price).subUnsafe(FixedNumber.from(this.minPrice)).isNegative()
      )
        return true;
      if (
        this.maxPrice &&
        FixedNumber.from(theme.price).subUnsafe(FixedNumber.from(this.maxPrice)).isNegative()
      )
        return true;
      return !this.minPrice && !this.maxPrice;
    });
    filteredThemes = filteredThemes!.filter((theme) => {
      if (this.isDao && theme.category == "dao") return true;
      if (this.isNFTMinter && theme.category == "nft-minter") return true;
      if (this.isNFTStaking && theme.category == "nft-staking") return true;
      return !this.isDao && !this.isNFTMinter && !this.isNFTStaking;
    });
    filteredThemes = filteredThemes!.filter((theme) => {
      if (this.isGold && theme.rating == "gold") return true;
      if (this.isSilver && theme.rating == "silver") return true;
      if (this.isPlatinum && theme.rating == "platinum") return true;
      if (this.isDiamond && theme.rating == "diamond") return true;
      return !this.isGold && !this.isSilver && !this.isPlatinum && !this.isDiamond;
    });
    filteredThemes = filteredThemes!.filter((theme) => {
      if (this.isOwned && walletStore.userPaidThemes.findIndex((userTheme) => theme.id == userTheme.id) >= 0)
        return true;
      if (this.isFree && theme.type == "free") return true;
      if (this.isNew && theme.status == "new") return true;
      if (this.isTopSeller && theme.status == "top") return true;
      if (this.isOnSale && theme.discount && theme.discount != 0) return true;
      return !this.isFree && !this.isNew && !this.isTopSeller && !this.isOnSale;
    });
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
