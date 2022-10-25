<template>
  <v-btn
    class="rounded-lg px-2 py-5 text-sm boder-gray-10 align-self-center"
    v-if="!walletStore.connected"
    @click="walletStore.connect()"
    :large="large"
    :block="block"
    :small="small"
    outlined
  >
    <div
      class="d-flex flex-row text-capitalize font-weight-regular justify-center"
    >
      <div class="mx-2 align-self-center">
        <v-img
          :src="require('@/assets/metamask-icon.png')"
          max-width="18px"
          contain
        ></v-img>
      </div>
      <div class="mr-3 align-self-center">
        <div class="white--text">Connect Wallet</div>
        <div class="gray7--text">Metamask</div>
      </div>
      <div class="straight-line"></div>
      <div class="align-self-center pa-2">
        <v-icon small color="white"> mdi-chevron-down </v-icon>
      </div>
    </div>
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

<style scoped>
.straight-line {
  width: 1px;
  height: 38px;
  background: #4f4f54;
}
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
</style>
