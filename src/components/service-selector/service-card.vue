<template>
  <v-card class="service-card border-radius-16 pa-6">
    <div class="card-bg" :class="'card-bg-' + cardBg"></div>
    <div class="card-overlay"></div>
    <div
      class="
        card-content
        full-height
        d-flex
        flex-column
        justify-space-between
        z-3
      "
    >
      <div class="z-3">
        <div class="d-flex justify-center z-3">
          <!-- <v-img class="img" :src="require(iconUrl)"></v-img> -->
          <v-icon v-if="icon">{{ icon }} </v-icon>
          <div class="gray3--text ml-2 text-dp-xs">{{ title }}</div>
        </div>
        <div class="z-3 gray6--text text-sm mt-3">
          {{ content }}
        </div>
      </div>
      <div class="d-flex justify-center z-3 mt-4">
        <v-btn
          class="border-radius-8 card-button px-6 py-5 btn-text text-none"
          @click="onButtonClick()"
          :disabled="isButtonDisable"
          v-if="walletStore.connected"
        >
          {{ buttonText }}
        </v-btn>
        <v-btn
          class="border-radius-8 card-button px-6 py-5 btn-text text-none"
          @click="walletStore.connect"
          v-else
        >
          Connect Wallet
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Observer
@Component({})
export default class ServiceCard extends Vue {
  @Prop() title!: string;
  @Prop() content!: string;
  @Prop() link!: string;
  @Prop() icon?: string;
  @Prop({ default: 1 }) cardBg!: number;
  @Prop({ default: "Create Now" }) buttonText!: string;
  @Prop({ default: false }) isButtonDisable!: boolean;

  walletStore = walletStore;

  onButtonClick() {
    if (this.link) this.$router.push(this.link);
  }
}
</script>

<style scope>
.service-card {
  position: relative;
  width: 334px !important;
  border: var(--v-gray11-base) 1px solid !important;
  overflow: hidden;
}
.card-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.img {
  max-width: 24px;
  max-height: 24px;
}
.card-button {
  min-width: 148px !important;
}
.card-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 150%;
  background-position: center center;
  background-repeat: no-repeat;
  filter: blur(16px);
  -webkit-filter: blur(16px);
  z-index: 1;
}
.card-bg-1 {
  background-image: url("@/assets/CardService/card-bg.png") !important;
}
.card-bg-2 {
  background-image: url("@/assets/CardService/card-bg2.png") !important;
}
.card-bg-3 {
  background-image: url("@/assets/CardService/card-bg3.png") !important;
}
.z-3 {
  z-index: 3 !important;
}
</style>
