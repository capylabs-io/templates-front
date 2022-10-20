import { action } from "mobx";
import VueRouter from "vue-router";
import { walletStore } from "./stores/wallet-store";
import { apiService } from "@/services/api-service";

export class AppProvider {
  router!: VueRouter;
  wallet = walletStore;
  api = apiService;

  @action.bound setVueRouter(router: VueRouter) {
    this.router = router;
  }
}

export const appProvider = new AppProvider();
