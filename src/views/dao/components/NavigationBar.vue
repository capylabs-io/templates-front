<template>
  <v-app-bar
    :light="!layoutStore.isNavDarkTheme"
    :dark="layoutStore.isNavDarkTheme"
    elevation="0"
  >
    <div class="full-width d-flex align-center justify-space-between px-2">
      <div class="font-weight-bold" v-if="!brandLogoPath">Your Logo Here</div>
      <img class="brand-logo" :src="brandLogoPath" contain v-else />
      <v-btn
        class="text-none"
        elevation="0"
        :color="layoutStore.primaryColor"
        dark
        >Connect Wallet</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { Vue, Component, Watch, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {},
})
export default class DaoNavigationBar extends Vue {
  @Inject() vm!: DaoViewModel;
  layoutStore = layoutStore;

  brandLogoPath = "";

  @Watch("layoutStore.brandLogo", { immediate: true }) onBrandLogoChanged(
    value: any
  ) {
    if (!this.vm.isReview) return;
    if (!value) {
      this.brandLogoPath = "";
      return;
    }
    this.brandLogoPath = URL.createObjectURL(this.layoutStore.brandLogo);
  }
}
</script>

<style scoped>
.brand-logo {
  height: 36px !important;
}
</style>