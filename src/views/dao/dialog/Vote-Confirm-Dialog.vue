<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="vm.isOpenVoteConfirm"
    width="400px"
    :overlay-opacity="0.8"
    persistent
  >
    <v-card
      class="border-radius-16 pa-6"
      :class="
        applicationStore.isDarkTheme
          ? 'box-border-gray11 white--text'
          : 'black--text'
      "
      :style="'background:' + applicationStore.cardColor + ' !important'"
    >
      <div class="dialog-title text-center">
        <div class="ma-auto">Confirm your vote</div>
      </div>
      <div class="mt-3">
        <v-form v-model="vm.confirmVoteForm">
          <div class="text-center">
            <div>You can not withdraw after voting close.</div>
            <div>
              Token owned:
              <span class="font-weight-bold">
                {{ walletStore.accountBalance || "0" | formatNumber(2) }}
                {{ applicationStore.daoToken?.symbol || "DAO Token" }}
              </span>
            </div>
          </div>
          <div class="mt-2">
            <div>Vote amount</div>
            <v-text-field
              class="border-radius-8 elevation-0 overflow-hidden mt-2"
              type="number"
              placeholder="Ex: 100"
              v-model="vm.voteAmount"
              dense
              solo
              outlined
              no-resize
              :color="applicationStore.primaryColor"
              :rules="[
                $rules.required,
                $rules.min(0.0001),
                $rules.max(+walletStore.accountBalance || 0),
              ]"
            ></v-text-field>
          </div>
        </v-form>
      </div>
      <div class="d-flex flex-row align-center justify-space-between mt-1">
        <v-btn
          color="gray60"
          class="btn-gray-11 px-4"
          @click="vm.closeVoteConfirm()"
          :disabled="vm.voting"
          >Cancel</v-btn
        >
        <v-btn
          color="success"
          class="white--text font-weight-bold text-capitalize rounded-lg px-4"
          @click="vm.sendVote()"
          :loading="vm.voting"
          :disabled="!vm.confirmVoteForm"
          v-if="vm.isVoteYes"
          ><v-icon class="mr-2" small>mdi-thumb-up</v-icon>Vote YES</v-btn
        >
        <v-btn
          color="error"
          class="white--text font-weight-bold text-capitalize rounded-lg px-4"
          @click="vm.sendVote()"
          :loading="vm.voting"
          :disabled="!vm.confirmVoteForm"
          v-else
          ><v-icon class="mr-2" small>mdi-thumb-down</v-icon>Vote NO</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";

@Observer
@Component({
  components: {},
})
export default class VoteConfrimDialog extends Vue {
  @Inject() vm!: ProposalDetailViewmodel;

  applicationStore = applicationStore;
  walletStore = walletStore;
}
</script>

<style scoped>
.border {
  border: 1px solid #565a61;
}
</style>
