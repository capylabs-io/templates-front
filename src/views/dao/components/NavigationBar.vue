<template>
  <v-app-bar
    :style="'background:' + applicationStore.navColor + ' !important'"
    :light="!applicationStore.isNavDarkTheme"
    :elevation="applicationStore.isNavDarkTheme ? 0 : 5"
    class="z-index-8"
  >
    <div class="full-width d-flex align-center justify-space-between px-2">
      <div
        class="font-weight-bold"
        v-if="
          !applicationStore.brandLogoFile && !applicationStore.brandLogoPath
        "
      >
        Cyberk.io
      </div>
      <CoverImage
        class="brand-logo"
        :imageUrl="applicationStore.brandLogo"
        :contain="true"
        defaultImageUrl=""
        v-else
      />
      <!-- <v-btn
        class="text-none"
        elevation="0"
        :color="applicationStore.primaryColor"
        dark
        >Connect Wallet</v-btn
      > -->
      <ConnectMetamask
        :requiredChainId="walletStore.chainId"
        :primaryColor="applicationStore.primaryColor"
      >
        <v-menu open-on-hover offset-y v-if="walletStore.connected">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="d-flex align-center rounded-lg text-none py-2 px-4"
              :style="{ border: '1px solid ' + applicationStore.primaryColor }"
              v-bind="attrs"
              v-on="on"
              large
            >
              <address-copy-board
                :address="walletStore.account"
                :isShortAddress="true"
                :shortStartAmount="6"
                :shortEndAmount="4"
                :iconSize="18"
                :textColor="applicationStore.primaryColor"
                :iconColor="applicationStore.primaryColor"
              ></address-copy-board>
            </div>
          </template>
          <v-list>
            <v-list-item class="d-flex align-center" disabled>
              <v-icon>mdi-account</v-icon>
              <v-list-item-title class="ml-3">Account Detail</v-list-item-title>
            </v-list-item>
            <v-list-item class="d-flex align-center" :to="'/management'">
              <v-icon>mdi-view-dashboard</v-icon>
              <v-list-item-title class="ml-3"
                >Your Applications</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </ConnectMetamask>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
    ConnectMetamask: () => import("@/components/wallet/ConnectMetamask.vue"),
  },
})
export default class DaoNavigationBar extends Vue {
  applicationStore = applicationStore;
  walletStore = walletStore;
}
</script>

<style scoped>
.brand-logo {
  height: 36px !important;
  max-width: 64px !important;
}
</style>
