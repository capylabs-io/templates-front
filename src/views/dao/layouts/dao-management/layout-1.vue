<template>
  <Responsive :breakpoints="{ small: (el) => el.width <= 960 }">
    <div slot-scope="el">
      <div class="full-width dao-banner">
        <v-img :src="bannerPath" cover />
      </div>
      <div class="dao-management ma-auto px-2 py-3">
        <v-row class="justify-center ma-auto">
          <v-col :cols="el.is.small ? 12 : 7">
            <DaoDetail />
          </v-col>
          <v-col :cols="el.is.small ? 12 : 5">
            <YourAccount />
            <div class="dao-side-banner">
              <v-img
                class="mt-6 border-radius-16"
                :src="sideBannerPath"
                cover
              />
            </div>
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
export default class DaoManagementLayout1 extends Vue {
  @Inject() vm!: DaoViewModel;

  layoutStore = layoutStore;

  bannerPath = "";
  sideBannerPath = "";

  @Watch("layoutStore.banner", { immediate: true }) onBannerChanged(
    value: any
  ) {
    if (!this.vm.isReview) return;
    if (!value) {
      this.bannerPath = require("@/assets/webservice/dao/default-banner.jpg");
      return;
    }
    this.bannerPath = URL.createObjectURL(this.layoutStore.banner);
  }

  @Watch("layoutStore.sideBanner", { immediate: true }) onSideBannerChanged(
    value: any
  ) {
    if (!this.vm.isReview) return;
    if (!value) {
      this.sideBannerPath = require("@/assets/webservice/dao/default-side-banner.jpg");
      return;
    }
    this.sideBannerPath = URL.createObjectURL(this.layoutStore.sideBanner);
  }
}
</script>