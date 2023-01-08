<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="vm.isOpenVoteConfirm"
    width="320px"
    persistent
  >
    <v-card class="border-radius-16 box-gray-12">
      <v-card-title class="dialog-title">
        <div class="ma-auto">Confirm your vote</div>
        <v-icon
          class="mr-1"
          @click="vm.changeVoteConfirmDialog()"
          color="blueJeans"
          >mdi-close</v-icon
        >
      </v-card-title>
      <v-card-text class="mt-3 text-sm font-weight-regular white--text">
        <div>You can not withdraw after voting close.</div>
      </v-card-text>
      <v-card-actions
        class="d-flex flex-row align-center px-6 pb-6 justify-space-between"
      >
        <v-btn
          color="gray60"
          class="btn-gray-11 px-4"
          @click="vm.changeVoteConfirmDialog()"
          >Cancel</v-btn
        >
        <v-btn
          color="majorelleBlue"
          class="white--text font-weight-bold text-capitalize rounded-lg px-4"
          @click="vm.voting()"
          v-if="vm.isVoteYes"
          >Vote YES</v-btn>
          <v-btn
          color="majorelleBlue"
          class="white--text font-weight-bold text-capitalize rounded-lg px-4"
          @click="vm.voting()"
          v-else
          >Vote NO</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";

@Observer
@Component({
  components: {},
})
export default class VoteConfrimDialog extends Vue {
@Prop({ default: false }) isVoteYes!: boolean;
@Inject() vm!: ProposalDetailViewmodel;
}
</script>

<style scoped>
.border {
  border: 1px solid #565a61;
}
</style>
