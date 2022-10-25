<template>
  <v-app-bar class="" height="64px" style="z-index: 99,max-width:100%" app flat color="gray12">
    <div
      class="nav-container ml-13 text-s font-weight-regular"
      style="min-width: 95%"
    >
      <v-row class="d-flex align-center justify-space-between">
        <v-col col="8" class="d-inline-flex">
          <div class="font-weight-bold text-xl align-self-center">
            Logo here
          </div>
          <!-- Main menu -->
          <div
            @click="openLink('/')"
            class="white--text text-decoration-none cursor-pointer pl-6 pr-2 align-self-center"
          >
            <div class="text-none">Home</div>
          </div>
          <router-link
            to="/service"
            class="white--text text-decoration-none cursor-pointer px-2 align-self-center"
            active-class="active"
          >
            <div class="text-none">Service</div>
          </router-link>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                class="white--text text-decoration-none cursor-pointer px-2 align-self-center"
                active-class="active"
              >
                <div class="text-none">Help</div>
              </div>
            </template>
            <span>Coming Soon</span>
          </v-tooltip>
        </v-col>
        <v-col col="3">
          <div class="d-flex align-center justify-end">
            <!-- <div class="pa-2 box-gray-11 rounded-circle mr-2 align-self-center">
              <v-icon>mdi-lightbulb-on-outline</v-icon>
            </div> -->
            <ConnectMetamask :requiredChainId="chainId">
              <v-menu open-on-hover offset-y v-if="wallet.connected">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="d-flex align-center connect-wallet rounded-lg text-none py-2 px-4"
                    v-bind="attrs"
                    v-on="on"
                    large
                  >
                    <address-copy-board
                      :address="wallet.account"
                      :isShortAddress="true"
                      :shortStartAmount="6"
                      :shortEndAmount="4"
                      :iconSize="18"
                    ></address-copy-board>
                  </div>
                </template>
                <v-list>
                  <div class="px-8 py-2 text-md mt-2">
                    HVG Balance:
                    <span class="primary--text font-weight-bold">{{
                      wallet.hvgBalance | formatNumber(2)
                    }}</span>
                  </div>
                  <div class="px-8 py-2 text-md">
                    AVAX Balance:
                    <span class="primary--text font-weight-bold">{{
                      wallet.avaxBalance | formatNumber(2)
                    }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                </v-list>
              </v-menu>
            </ConnectMetamask>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";

@Observer
@Component({
  components: {
    ConnectMetamask: () => import("@/components/wallet/ConnectMetamask.vue"),
    WalletDialog: () => import("@/components/wallet/WalletDialog.vue"),
  },
})
export default class NavigationBar extends Vue {
  wallet = walletStore;
  // chainId = process.env.VUE_APP_CHAIN_ID;
  chainId = "";
  openLink(url) {
    window.open(url, "_blank");
  }
}
</script>

<style scoped>
.nav-container {
  max-width: 1562px;
}
.connect-wallet {
  border: 1px solid var(--v-primary-base);
  box-sizing: border-box;
  /* background: #27292c; */
}
.active {
  color: var(--v-primary-base) !important;
}
</style>
