<template>
  <v-btn
    class="rounded-lg px-5 py-5 text-sm"
    v-if="!walletStore.connected"
    @click="walletStore.connect()"
    :large="large"
    :block="block"
    :small="small"
    color="gold50"
    outlined
  >
    <div class="text-capitalize font-weight-bold">Connect Wallet</div>
    <!-- <v-img
      class="ml-3"
      :src="require('@/assets/wallet.svg')"
      max-width="18px"
      contain
    ></v-img> -->
  </v-btn>
  <v-btn
    text-caption
    pr-2
    depressed
    rounded-lg
    transparent-bg
    color="primary"
    outlined
    :large="large"
    :block="block"
    :small="small"
    v-else-if="walletStore.chainId + '' !== Number(requiredChainId).toString()"
    @click="walletStore.switchNetwork(+walletStore.chainId)"
  >
    Switch to {{ networkName }}
  </v-btn>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { blockchainHandler } from "@/blockchain";
import { walletStore } from "@/stores/wallet-store";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ConnectMetamask extends Vue {
  @Prop() requiredChainId!: string;
  @Prop({ default: false }) block!: boolean;
  @Prop({ default: false }) large!: boolean;
  @Prop({ default: false }) small!: boolean;

  walletStore = walletStore;

  get networkName() {
    const { name } = blockchainHandler.getChainConfig(this.requiredChainId);
    return name;
  }
}
</script>

<style scoped></style>
