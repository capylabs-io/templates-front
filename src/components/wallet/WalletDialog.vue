<template>
  <v-card class="elevation-0 card-bg border-radius-8 pa-6" min-width="342px">
    <div>
      <div class="content-title font-weight-bold">
        {{ wallet.account | truncateAddress(10, 6) }}
      </div>
    </div>
    <v-divider class="mt-6"></v-divider>
  </v-card>
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
export default class Staking extends Vue {
  wallet = walletStore;
  openLink(url) {
    window.open(url, "_blank");
  }
}
</script>
