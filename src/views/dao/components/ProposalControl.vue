<template>
  <div
    class="pa-4 text-sm font-weight-regular border-radius-8"
    :style="'background:' + applicationStore.accentColor + ' !important'"
    :class="
      applicationStore.isDarkTheme
        ? 'white--text box-border-gray11'
        : 'black--text'
    "
  >
    <div v-if="vm.proposal?.status == 'draft'">
      <div class="warning--text text-md">
        Attention! This is a draft version of the proposal. Please review
        carefully before publishing your final version. Once published, you can
        no longer edit the proposal
      </div>
      <div class="d-flex mt-2">
        <v-btn
          class="control-btn text-none btn-text border-radius-8"
          color="error"
          @click="vm.deleteProposal()"
          dense
          depressed
        >
          <v-icon class="mr-1" small>mdi-trash-can</v-icon>
          <span> Delete </span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="control-btn text-none btn-text border-radius-8 mr-3"
          :color="applicationStore.primaryColor"
          dense
          depressed
        >
          <v-icon class="mr-1" small>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn
          class="control-btn text-none btn-text border-radius-8"
          @click="vm.publishProposal()"
          :color="applicationStore.primaryColor"
          dense
          depressed
        >
          <v-icon class="mr-1" small>mdi-publish</v-icon>
          Publish
        </v-btn>
      </div>
    </div>
    <div v-if="vm.proposal?.status == 'onHold'">
      <div class="warning--text text-md">
        Voting process has completed! Please switch the proposal to Executing
        state whenever you are ready.
      </div>
      <div class="d-flex mt-2">
        <v-btn
          class="text-none btn-text border-radius-8"
          :color="applicationStore.primaryColor"
          dense
          depressed
        >
          <v-icon class="mr-1" small>mdi-publish</v-icon>
          Switch to Executing state
        </v-btn>
      </div>
    </div>
    <div v-if="vm.proposal?.status == 'executing'">
      <div class="warning--text text-md">
        Please switch the proposal to Passed state whenever you have completed
        the proposal.
      </div>
      <div class="d-flex mt-2">
        <v-btn
          class="text-none btn-text border-radius-8"
          color="success"
          dense
          depressed
        >
          <v-icon class="mr-1" small>mdi-check-circle-outline</v-icon>
          Switch to Passed state
        </v-btn>
      </div>
    </div>
    <div v-if="vm.proposal?.status == 'voting'">
      <div class="warning--text text-md">
        Voting process has began. You are able to cancel this proposal before
        voting end-time!
      </div>
      <div class="d-flex mt-2">
        <v-btn
          class="text-none btn-text border-radius-8"
          color="gray8"
          @click="vm.cancelProposal()"
          dense
          depressed
        >
          <v-icon class="mr-1" small>mdi-cancel</v-icon>
          Cancel Proposal
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";

@Observer
@Component({
  components: {},
})
export default class ProposalControl extends Vue {
  @Inject() vm!: ProposalDetailViewmodel;

  applicationStore = applicationStore;
}
</script>

<style scoped>
.control-btn {
  min-width: 96px !important;
}
</style>
