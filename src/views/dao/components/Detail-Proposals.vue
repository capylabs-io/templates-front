<template>
  <v-card
    class="pa-4 border-radius-16"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important'"
    elevation="0"
    outlined
  >
    <div class="d-flex justify-space-between align-center">
      <v-btn class="px-0 ml-n2 btn-text" @click="vm.backSolendDao()" text>
        <v-icon :color="applicationStore.primaryColor" small>
          mdi-chevron-left</v-icon
        >
        <span
          class="text-capitalize"
          :style="'color:' + applicationStore.primaryColor + ' !important'"
          >Back</span
        >
      </v-btn>
      <v-btn :color="applicationStore.primaryColor" icon>
        <v-icon class="ml-4">mdi-launch</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-space-between mt-3">
      <div class="text-dp-xs font-weight-bold text-capitalize">
        {{ vm.currentProposal?.title }}
      </div>
      <div>
        <ProposalStatus />
      </div>
    </div>
    <div
      class="pa-4 mt-4 text-sm font-weight-regular border-radius-8"
      :style="'background:' + applicationStore.accentColor + ' !important'"
      :class="
        applicationStore.isDarkTheme
          ? 'white--text box-border-gray11'
          : 'black--text'
      "
    >
      {{ vm.currentProposal?.description }}
    </div>
    <div
      class="d-flex justify-space-between pt-3"
      v-if="vm.isVoted && !vm.isVoteDone"
    >
      <v-btn
        color="gray60"
        height="34px"
        outlined
        class="px-4 text-capitalize"
        @click="vm.voteExcute()"
        >Inspect</v-btn
      >
      <v-btn
        class="
          btn-gray-11
          white--text
          font-weight-bold
          text-capitalize
          rounded-lg
          px-4
        "
        @click="vm.voteExcute()"
        :loading="vm.loading"
        >Execute</v-btn
      >
    </div>
    <div class="d-flex justify-space-between pt-3" v-if="vm.isVoteDone">
      <v-btn color="gray60" height="34px" outlined class="px-4 text-capitalize"
        >Inspect executed instruction</v-btn
      >
      <v-btn outlined color="emerald">
        <div class="d-flex align-center">
          <v-icon>mdi-check</v-icon>
          <div class="text-capitalize align-seft-center">Executed</div>
        </div>
      </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Observer
@Component({
  components: {
    ProposalStatus: () => import("../components/ProposalStatus.vue"),
  },
})
export default class DetailProposal extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>
<style scoped>
</style>