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
      <v-btn class="px-0 ml-n2 btn-text" @click="backToDao()" text>
        <v-icon :color="applicationStore.primaryColor" small>
          mdi-chevron-left</v-icon
        >
        <span
          class="text-capitalize"
          :style="'color:' + applicationStore.primaryColor + ' !important'"
          >Back</span
        >
      </v-btn>
      <v-btn
        class="mr-n2"
        :color="applicationStore.primaryColor"
        v-if="vm.proposal?.status != 'draft'"
        icon
      >
        <v-icon>mdi-launch</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-space-between mt-3">
      <div class="text-dp-xs font-weight-bold text-capitalize">
        {{ vm.proposal?.title }}
      </div>
      <div>
        <ProposalStatus :status="vm.proposal?.status" />
      </div>
    </div>
    <div
      class="mt-4"
      v-if="
        applicationStore.isApplicationOwner &&
        (vm.proposal?.status == 'draft' ||
          vm.proposal?.status == 'onHold' ||
          vm.proposal?.status == 'voting' ||
          vm.proposal?.status == 'executing')
      "
    >
      <ProposalControl />
    </div>
    <div
      class="pa-4 mt-4 font-weight-regular border-radius-8"
      :style="'background:' + applicationStore.accentColor + ' !important'"
      :class="
        applicationStore.isDarkTheme
          ? 'white--text box-border-gray11'
          : 'black--text'
      "
      v-html="vm.proposal?.description || 'No Description'"
    ></div>
  </v-card>
</template>
<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";

@Observer
@Component({
  components: {
    ProposalStatus: () => import("../components/ProposalStatus.vue"),
    ProposalControl: () => import("../components/ProposalControl.vue"),
  },
})
export default class DetailProposal extends Vue {
  @Inject() vm!: ProposalDetailViewmodel;

  applicationStore = applicationStore;
  backToDao() {
    this.$router.push(`/dao/${applicationStore.application?.appId}`);
  }
}
</script>