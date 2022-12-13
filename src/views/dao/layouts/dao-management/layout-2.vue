<template>
  <Responsive :breakpoints="{ small: (el) => el.width <= 960 }">
    <div slot-scope="el">
      <div class="full-width">
        <v-img :src="bannerPath" cover />
      </div>
      <div class="dao-management ma-auto px-2 py-3">
        <v-row class="justify-center ma-auto">
          <v-col :cols="el.is.small ? 12 : 5">
            <YourAccount />
            <v-img
              class="mt-6 border-radius-16"
              src="@/assets/dao-front-banner.png"
            />
          </v-col>
          <v-col :cols="el.is.small ? 12 : 7">
            <DaoDetail />
          </v-col>
        </v-row>
      </div>
    </div>
  </Responsive>
</template>

<script lang="ts">
import { Vue, Component, Inject, Watch } from "vue-property-decorator";
import { DaoViewModel } from "../../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";
import { layoutStore } from "@/stores/layout-store";

@Component({
  components: {
    DaoDetail: () => import("../../components/DaoDetail.vue"),
    YourAccount: () => import("../../components/YourAccount.vue"),
    Responsive,
  },
})
export default class DaoManagementLayout2 extends Vue {
  @Inject() vm!: DaoViewModel;

  layoutStore = layoutStore;

  bannerPath = "";

  @Watch("vm.banner", { immediate: true }) onBannerChanged(value: any) {
    if (!this.vm.isReview) return;
    if (!value) {
      this.bannerPath = require("@/assets/dao-banner.png");
      return;
    }
    this.bannerPath = URL.createObjectURL(this.layoutStore.banner);
  }
}
</script>

<style scoped>
</style>