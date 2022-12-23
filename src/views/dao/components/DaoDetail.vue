<template>
  <v-card
    class="pa-4 border-radius-16"
    :class="
      layoutStore.isDarkTheme ? 'box-border-gray11 white--text' : 'black--text'
    "
    :style="'background:' + layoutStore.cardColor + ' !important;'"
    :outlined="layoutStore.isDarkTheme"
    elevation="0"
  >
    <div class="d-inline-flex justify-space-between full-width">
      <div class="d-flex align-center dao-title">
        <CoverImage
          class="token-icon mr-2"
          :imageUrl="layoutStore.tokenIcon"
          :defaultImageUrl="require('@/assets/axie-icon.png')"
        />
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="text-truncate text-dp-xs font-weight-bold"
              v-bind="attrs"
              v-on="on"
            >
              {{ layoutStore.application?.name }}
            </div>
          </template>
          <span class="font-weight-bold">
            {{ layoutStore.application?.name }}</span
          >
        </v-tooltip>
      </div>
      <div class="d-flex align-center text-sm font-weight-regular gray6--text">
        <v-icon class="mr-1" color="gray6" small>mdi-account-multiple</v-icon>
        <span>Members (194)</span>
        <v-icon class="ml-3 mr-1" color="gray6" small>mdi-cog</v-icon>
        <span>Params</span>
        <v-icon class="ml-4" :color="layoutStore.primaryColor"
          >mdi-launch</v-icon
        >
      </div>
    </div>
    <div
      class="pa-1 w-fit-content text-capitalize border-radius-8 mt-3"
      :class="{ 'box-border-gray11': layoutStore.isDarkTheme }"
      :style="'background:' + layoutStore.accentColor + ' !important'"
    >
      <v-btn
        text
        class="text-capitalize"
        :class="{
          'white--text': layoutStore.isDarkTheme,
          'black--text': !layoutStore.isDarkTheme && !showProposals,
        }"
        :style="
          showProposals
            ? 'background:' + layoutStore.primaryColor + ' !important'
            : ''
        "
        @click="showProposals = true"
        >Proposals</v-btn
      >
      <v-btn
        text
        class="text-capitalize"
        :class="{
          'white--text': layoutStore.isDarkTheme,
          'black--text': !layoutStore.isDarkTheme && showProposals,
        }"
        :style="
          !showProposals
            ? 'background:' + layoutStore.primaryColor + ' !important'
            : ''
        "
        @click="showProposals = false"
        >About</v-btn
      >
    </div>
    <div>
      <Proposals v-if="showProposals" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Proposals from "./_Proposals.vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { layoutStore } from "@/stores/layout-store";
@Observer
@Component({
  components: {
    Proposals,
    CoverImage: () => import("@/components/CoverImage.vue"),
  },
})
export default class SolendDao extends Vue {
  @Inject() vm!: DaoViewModel;
  @Prop({ default: false }) isSmall!: boolean;

  layoutStore = layoutStore;
  showProposals = true;
}
</script>

<style>
.dao-title {
  width: calc(100% - 16px * 2 - 252px) !important;
}
.token-icon {
  max-width: 24px;
  max-height: 24px;
}
.dao-side-banner {
  max-width: 432px;
}
.dao-banner {
  max-height: 220px;
}
</style>