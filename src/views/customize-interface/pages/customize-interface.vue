<template>
  <div>
    <div v-if="vm.isChoosingTheme">
      <ThemeSelector />
    </div>
    <div class="customize-layout d-flex" v-else>
      <CustomizeDrawer />
      <div class="layout-content">
        <v-app-bar>
          <v-select
            v-model="vm.selectedPage"
            :items="vm.appMainPages"
            item-text="title"
            item-value="value"
            class="page-select"
            hide-details
            dense
            outlined
          ></v-select>
        </v-app-bar>
        <div v-if="vm.appType == 'dao'">
          <div v-if="vm.selectedPage == 'management'">
            <DaoInterface :isReview="true" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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

  async created() {
    await this.vm.fetchApplication();
    this.vm.selectedPage = this.vm.appMainPages![0].value;
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
.layout-content {
  width: 100%;
}
.page-select {
  max-width: 214px !important;
}
</style>