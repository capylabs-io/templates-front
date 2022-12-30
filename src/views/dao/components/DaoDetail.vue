<template>
  <v-card
    class="pa-4 border-radius-16"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important;'"
    :outlined="applicationStore.isDarkTheme"
    elevation="0"
  >
    <div class="d-inline-flex justify-space-between full-width">
      <div class="d-flex align-center dao-title">
        <CoverImage
          class="token-icon mr-2"
          :imageUrl="applicationStore.tokenIcon"
          :defaultImageUrl="require('@/assets/axie-icon.png')"
        />
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="text-truncate text-dp-xs font-weight-bold"
              v-bind="attrs"
              v-on="on"
            >
              {{ applicationStore.application?.name }}
            </div>
          </template>
          <span class="font-weight-bold">
            {{ applicationStore.application?.name }}</span
          >
        </v-tooltip>
      </div>
      <div class="d-flex align-center text-sm font-weight-regular gray6--text">
        <v-icon
          class="mr-1"
          color="gray6"
          small
          @click="(vm.pickMembers = !vm.pickMembers), vm.setpickDao(false)"
        >
          mdi-account-multiple</v-icon
        >
        <span
          class="onCursor"
          @click="(vm.pickMembers = !vm.pickMembers), vm.setpickDao(false)"
          >Members ({{
            vm.daoSetting?.members === undefined
              ? "0"
              : vm.daoSetting?.members?.length
          }})</span
        >
        <v-icon
          class="ml-3 mr-1"
          color="gray6"
          small
          @click="
            (vm.pickParameters = !vm.pickParameters), vm.setpickDao(false)
          "
          >mdi-cog</v-icon
        >
        <span
          @click="(vm.pickParameters = !vm.pickParameters), vm.setpickDao(false)"
          class="onCursor"
          >Params</span
        >
        <v-icon class="ml-4" :color="applicationStore.primaryColor"
          >mdi-launch</v-icon
        >
      </div>
    </div>
    <div
      class="pa-1 w-fit-content text-capitalize border-radius-8 mt-3"
      :class="{ 'box-border-gray11': applicationStore.isDarkTheme }"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-btn
        text
        class="text-capitalize"
        :class="{
          'white--text': applicationStore.isDarkTheme,
          'black--text': !applicationStore.isDarkTheme && !showProposals,
        }"
        :style="
          showProposals
            ? 'background:' + applicationStore.primaryColor + ' !important'
            : ''
        "
        @click="showProposals = true"
        >Proposals</v-btn
      >
      <v-btn
        text
        class="text-capitalize"
        :class="{
          'white--text': applicationStore.isDarkTheme,
          'black--text': !applicationStore.isDarkTheme && showProposals,
        }"
        :style="
          !showProposals
            ? 'background:' + applicationStore.primaryColor + ' !important'
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
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Proposals from "./_Proposals.vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";
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
  @Watch("pickParameters", { immediate: true }) onpickParametersChanged(
    val: boolean
  ) {
    this.vm.setpickParameters(val);
  }
  applicationStore = applicationStore;
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
  /* max-width: 432px; */
  aspect-ratio: 3 / 4;
}
.dao-banner {
  max-height: 220px;
  aspect-ratio: 8 / 1;
}
.onCursor {
  cursor: pointer;
}
</style>
