<template>
  <div>
    <div v-if="vm.isChoosingTheme">
      <ThemeSelector />
    </div>
    <div class="customize-layout d-flex" v-else>
      <CustomizeDrawer />
      <div class="layout-content">
        <div v-if="vm.appType == 'dao'">
          <DaoInterface :isReview="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { walletStore } from "@/stores/wallet-store";
import { Vue, Component, Provide } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {
    ThemeSelector: () => import("./theme-selector.vue"),
    CustomizeDrawer: () => import("./customize-drawer.vue"),
    DaoInterface: () => import("../../dao/pages/Dao.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Provide() vm = new CustomizeInterfaceViewmodel();

  walletStore = walletStore;
  layoutStore = layoutStore;

  created() {
    const appType = this.$route.query.type.toString();
    this.vm.setAppType(appType);
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