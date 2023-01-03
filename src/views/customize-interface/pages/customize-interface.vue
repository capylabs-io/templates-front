<template>
  <div>
    <div v-if="vm.isChoosingTheme">
      <ThemeSelector />
    </div>
    <div class="customize-layout d-flex" v-else>
      <CustomizeDrawer />
      <div class="layout-content">
        <div v-if="vm.appType == 'dao'">
          <div v-if="vm.selectedPage == 'management'">
            <DaoInterface :isReview="true" />
          </div>
          <div v-else>
            <ProposalInterface :isReview="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";
import { Vue, Component, Provide } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";
import { loadingController } from "@/components/global-loading/global-loading-controller";
import { snackController } from "@/components/snack-bar/snack-bar-controller";

@Component({
  components: {
    ThemeSelector: () => import("./theme-selector.vue"),
    CustomizeDrawer: () => import("./customize-drawer.vue"),
    DaoInterface: () => import("../../dao/pages/Dao.vue"),
    ProposalInterface: () => import("../../dao/pages/Proposal.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Provide() vm = new CustomizeInterfaceViewmodel();

  walletStore = walletStore;
  applicationStore = applicationStore;

  async created() {
    loadingController.increaseRequest();
    try {
      const appType = this.$route.query.type.toString();
      this.vm.setAppType(appType);
      await this.vm.fetchApplication(this.$route.query.appId);
      if (!applicationStore.application?.theme) {
        this.vm.setChoosingTheme(true);
      }
    } catch (error) {
      snackController.error(error);
    } finally {
      loadingController.decreaseRequest();
    }
  }
}
</script>

<style scoped>
.customize-layout {
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.customize-layout::before {
  content: "";
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
}

.layout-content {
  z-index: 10;
  width: calc(100vw - 312px) !important;
}
.page-select {
  max-width: 214px !important;
}
</style>