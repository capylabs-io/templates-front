<template>
  <v-app-bar
    :light="!layoutStore.isNavDarkTheme"
    :dark="layoutStore.isNavDarkTheme"
    elevation="0"
  >
    <div class="full-width d-flex align-center justify-space-between px-2">
      <div
        class="font-weight-bold"
        v-if="!layoutStore.brandLogoFile && !layoutStore.brandLogoPath"
      >
        Your Logo Here
      </div>
      <CoverImage
        class="brand-logo"
        :imageUrl="layoutStore.brandLogo"
        defaultImageUrl=""
        contain
        v-else
      />
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
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
  },
})
export default class DaoNavigationBar extends Vue {
  @Inject() vm!: DaoViewModel;
  layoutStore = layoutStore;
}
</script>

<style scoped>
.brand-logo {
  height: 36px !important;
  max-width: 64px !important;
}
</style>