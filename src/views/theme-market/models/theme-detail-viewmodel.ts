import { walletStore } from "@/stores/wallet-store";
import { appProvider } from "./../../../app-providers";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { apiService } from "./../../../services/api-service";
import { ThemeModel } from "./../../../models/theme-model";
import { action, computed, flow, observable } from "mobx";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { FixedNumber } from "@ethersproject/bignumber";

export class ThemeDetailViewmodel {
  @observable theme?: ThemeModel;

  @observable confirmPurchaseDialog?: boolean = false;
  @observable purchaseResultDialog?: boolean = false;

  @observable purchaseResult?: boolean = false;

  fetchTheme = flow(function* (this, themeId) {
    try {
      loadingController.increaseRequest();
      const theme = yield apiService.themes.findOne(themeId);
      if (!theme) {
        snackController.error("Theme does not exist!");
        appProvider.router.push("/theme-market");
      }
      this.theme = theme;
    } catch (err: any) {
      snackController.error(`Error occurred! ${err}`);
      appProvider.router.push("/home");
    } finally {
      loadingController.decreaseRequest();
    }
  });

  progressPurchase = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      this.confirmPurchaseDialog = false;
      this.purchaseResultDialog = false;

      if (!this.theme) {
        this.purchaseResult = false;
        this.purchaseResultDialog = true;
        snackController.error(`Error occurred! Please try again later!`);
        return;
      }
      yield apiService.purchaseTheme({
        userId: walletStore.userId,
        themeId: this.theme.id,
      });
      this.purchaseResult = true;
      this.purchaseResultDialog = true;
      snackController.success("Purchased successfully!");
    } catch (err: any) {
      this.purchaseResult = false;
      this.purchaseResultDialog = true;
      snackController.error(`Error occurred! ${err}`);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @action.bound openConfirmPurchase(val: boolean) {
    this.confirmPurchaseDialog = val;
  }
  @action.bound openPurchaseResult(val: boolean) {
    this.purchaseResultDialog = val;
  }

  @computed get themeName() {
    if (!this.theme || !this.theme.name) return "Default Theme";
    return this.theme.name;
  }

  @computed get themeCount() {
    if (!this.theme || !this.theme.count) return 1;
    return this.theme.count;
  }

  @computed get themeAuthor() {
    if (!this.theme || !this.theme?.metadata || !this.theme?.metadata.author) return "Cyberk Team";
    return this.theme?.metadata.author;
  }

  @computed get themePrice() {
    if (!this.theme || !this.theme.price) return "Free";
    else if (FixedNumber.from(this.theme.price).isZero()) return "Free";
    return FixedNumber.from(this.theme.price).toString();
  }

  @computed get isThemeOnSale() {
    if (!this.theme || !this.theme.discount) return false;
    return this.theme.discount != 0;
  }

  @computed get themeDiscountPrice() {
    if (!this.theme || !this.theme.discount) return 0;
    if (this.theme.discount > 100) return 0;
    else if (this.theme.discount < 0) return this.themePrice;
    return FixedNumber.from(this.theme.price)
      .mulUnsafe(FixedNumber.from(100 - this.theme.discount))
      .divUnsafe(FixedNumber.from(100));
  }

  @computed get themeDescription() {
    if (!this.theme || !this.theme.description)
      return "<div class='my-16 text-center text-dp-xs font-weight-bold'>No Information about this theme!</div>";
    return this.theme.description;
  }

  @computed get themeThumbnails() {
    if (!this.theme || !this.theme.metadata || !this.theme.metadata.thumbnails) return [];
    return this.theme.metadata.thumbnails;
  }

  @computed get isThemeOwned() {
    if (!this.theme) return false;
    return (
      this.theme.type == "free" ||
      (walletStore.connected && walletStore.userThemes!.findIndex((theme) => theme.id == this.theme!.id) >= 0)
    );
  }
}
