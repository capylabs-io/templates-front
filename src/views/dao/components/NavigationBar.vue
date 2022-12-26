<template>
  <v-app-bar
    :style="'background:' + applicationStore.navColor + ' !important'"
    :light="!applicationStore.isNavDarkTheme"
    :dark="applicationStore.isNavDarkTheme"
    elevation="0"
  >
    <div class="full-width d-flex align-center justify-space-between px-2">
      <div
        class="font-weight-bold"
        v-if="
          !applicationStore.brandLogoFile && !applicationStore.brandLogoPath
        "
      >
        Your Logo Here
      </div>
      <CoverImage
        class="brand-logo"
        :imageUrl="applicationStore.brandLogo"
        :contain="true"
        defaultImageUrl=""
        v-else
      />
      <v-btn
        class="text-none"
        elevation="0"
        :color="applicationStore.primaryColor"
        dark
        >Connect Wallet</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
  },
})
export default class DaoNavigationBar extends Vue {
  @Inject() vm!: DaoViewModel;
  applicationStore = applicationStore;
}
</script>

<style scoped>
.brand-logo {
  height: 36px !important;
  max-width: 64px !important;
}
</style>