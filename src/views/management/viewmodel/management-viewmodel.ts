import { confirmDialogController } from "./../../../components/confirm-dialog/confirm-dialog-controller";
import { ApplicationModel } from "@/models/application-model";
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
        status_ne: "deleted",
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

  confirmDeleteApplication = (application: ApplicationModel) => {
    try {
      confirmDialogController.confirm({
        title: "Confirm Delete Application",
        content: `Are you sure you want to remove application <span class='font-weight-bold white--text'>${
          application.name
        }</span>? 
        <br/> This application will be in your trash bin for <span class='font-weight-bold white--text'>30 days</span> after removing, in case you want to restore it. 
        <div class='error--text mt-1'>After ${this.getDeletedDate(
          application.updatedAt
        )}, this application will be deleted pernamently!</div>`,
        doneText: "Remove",
        doneCallback: async () => {
          await this.deleteApplication(application);
        },
      });
    } catch (err: any) {
      snackController.commonError(err);
    } finally {
      loadingController.decreaseRequest();
    }
  };

  deleteApplication = async (application: ApplicationModel) => {
    try {
      if (!application || !application.appId) return;
      loadingController.increaseRequest();
      await apiService.deleteApplication(application.appId + "");
      await this.fetchApplications();
      snackController.success(
        "Remove application successfully! Please check your trash bin to restore removed applications!"
      );
    } catch (err: any) {
      snackController.commonError(err);
    } finally {
      loadingController.decreaseRequest();
    }
  };

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
    if (!this.applications || this.applications.length == 0) return 1;
    if (this.applications.length % this.itemsPerPage! == 0)
      return this.applications.length / this.itemsPerPage!;
    else return Math.floor(this.applications.length / this.itemsPerPage!) + 1;
  }

  getDeletedDate(removedAt: string) {
    const [yyyy, mm, dd, hh, mi] = removedAt.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
  }
}
