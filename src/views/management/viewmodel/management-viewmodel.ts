import { walletStore } from "@/stores/wallet-store";
import { apiService } from "@/services/api-service";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { computed, flow, observable } from "mobx";

export class ManagementViewModel {
  @observable applications: any;
  @observable searchKey?: string;
  @observable page?: number = 1;
  @observable itemsPerPage?: number = 12;

  fetchApplications = flow(function* (this) {
    try {
      loadingController.increaseRequest();
      const res = yield apiService.applications.find({
        userId: walletStore.userId,
      });
      if (!res || !res.applications) {
        this.applications = [];
        return;
      }
      this.applications = res.applications;
    } catch (err: any) {
      snackController.commonError(err);
    } finally {
      loadingController.decreaseRequest();
    }
  });

  @computed get filteredApplications() {
    if (!this.applications) return [];
    if (!this.searchKey) return this.applications;
    return this.applications.filter((app) => app.name.toLowerCase().includes(this.searchKey?.toLowerCase()));
  }

  @computed get slicedApplications() {
    return this.filteredApplications.slice(
      (this.page! - 1) * this.itemsPerPage!,
      this.page! * this.itemsPerPage!
    );
  }

  @computed get totalPage() {
    if (!this.applications) return 1;
    if (this.applications.length % this.itemsPerPage! == 0)
      return this.applications.length / this.itemsPerPage!;
    else return Math.floor(this.applications.length / this.itemsPerPage!) + 1;
  }
}