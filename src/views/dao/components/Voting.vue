<template>
  <v-card
    class="pa-4 border-radius-16 text-sm font-weight-regular"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="{
      background: applicationStore.cardColor + ' !important',
      color: applicationStore.isDarkTheme ? 'white' : 'black',
    }"
    elevation="0"
    outlined
  >
    <div>
      <div class="d-flex justify-space-between text-lg">
        <div class="d-flex align-center">
          <div class="font-weight-bold">
            {{ vm.isVoteDone ? "Result" : "Voting now" }}
          </div>
          <div
            class="align-center px-2 py-1 border-radius-8 ml-3"
            :style="
              'background:' + applicationStore.accentColor + ' !important'
            "
            :class="
              applicationStore.isDarkTheme
                ? 'white--text box-border-gray11'
                : 'black--text'
            "
            v-if="!vm.isVoteDone"
          >
            <Countdown :targetDate="vm.voteEnd" />
          </div>
        </div>
        <div
          class="d-flex cursor-pointer align-center text-sm cursor-pointer"
          :style="'color:' + applicationStore.primaryColor"
          @click="vm.toggleVoteResult()"
        >
          <span>View</span>
          <v-icon :color="applicationStore.primaryColor" small>
            mdi-chevron-right</v-icon
          >
        </div>
      </div>
      <!-- 
      <div class="text-center" v-if="vm.isVoted">
        
      </div> -->

      <div
        class="pa-4 mt-4 border-radius-8"
        :style="'background:' + applicationStore.accentColor + ' !important'"
        :class="
          applicationStore.isDarkTheme
            ? 'white--text box-border-gray11'
            : 'black--text'
        "
      >
        <div class="d-flex justify-space-between">
          <div class="text-left">
            <div class="text-overline-1">VOTE</div>
            <div class="text-lg font-weight-bold mt-1 success--text">YES</div>
            <div class="d-flex align-center text-xl font-weight-bold">
              <div>{{ vm.totalYesVotes | formatNumber(0) }}</div>
              <div
                class="text-sm ml-2"
                :style="{ color: applicationStore.primaryColor }"
              >
                ({{ vm.totalYesPercent | formatNumber(0) }}%)
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-overline-1">VOTE</div>
            <div class="text-lg font-weight-bold mt-1 error--text">NO</div>
            <div class="d-flex align-center text-xl font-weight-bold">
              <div
                class="text-sm mr-2"
                :style="{ color: applicationStore.primaryColor }"
              >
                ({{ vm.totalNoPercent | formatNumber(0) }}%)
              </div>
              <div>{{ vm.totalNoVotes | formatNumber(0) }}</div>
            </div>
          </div>
        </div>
        <v-progress-linear
          background-color="error"
          color="success"
          class="rounded-xl mt-3"
          :value="vm.totalYesPercent.toString()"
          height="12px"
        ></v-progress-linear>
      </div>
      <div
        class="pa-4 mt-4 border-radius-8"
        :style="'background:' + applicationStore.accentColor + ' !important'"
        :class="
          applicationStore.isDarkTheme
            ? 'white--text box-border-gray11'
            : 'black--text'
        "
        v-if="!vm.isVoteDone"
      >
        <div class="d-flex justify-space-between align-center">
          <div class="text-sm">Approval Quorum</div>
          <!-- <v-icon color="gray6">mdi-information-outline</v-icon> -->
        </div>
        <div class="font-weight-bold text-sm mt-2">
          At least {{ vm.proposal?.quorum }}% Yes Vote required
        </div>
        <v-progress-linear
          height="12px"
          class="rounded-xl mt-2"
          :value="vm.proposal?.quorum"
          :color="applicationStore.primaryColor"
        ></v-progress-linear>
      </div>
      <div class="text-lg text-center mt-4" v-if="!vm.isVoted">
        Cast your vote
      </div>
      <v-row class="justify-center mt-2" v-if="!vm.isVoted">
        <v-col cols="6 pr-2">
          <v-btn
            class="full-width border-radius-8 text-none py-5"
            @click="vm.openVoteConfirm(true)"
            :color="applicationStore.isDarkTheme ? 'gray11' : 'gray2'"
            :light="!applicationStore.isDarkTheme"
            :dark="applicationStore.isDarkTheme"
            :disabled="!walletStore.connected"
            elevation="0"
          >
            <div class="d-flex align-center">
              <v-icon color="success" class="mr-2 align-center"
                >mdi-thumb-up</v-icon
              >
              Vote <span class="font-weight-bold ml-1">YES</span>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="6 pl-2">
          <v-btn
            class="full-width border-radius-8 text-none py-5"
            @click="vm.openVoteConfirm(false)"
            :color="applicationStore.isDarkTheme ? 'gray11' : 'gray2'"
            :light="!applicationStore.isDarkTheme"
            :dark="applicationStore.isDarkTheme"
            :disabled="!walletStore.connected"
            elevation="0"
          >
            <div class="d-flex align-center">
              <v-icon color="error" class="mr-2 align-center"
                >mdi-thumb-down</v-icon
              >
              Vote <span class="font-weight-bold ml-1">NO</span>
            </div>
          </v-btn></v-col
        >
      </v-row>
      <div v-else class="mt-4 text-center">
        <div class="font-weight-bold mt-3 text-lg">You have voted</div>
        <div class="d-flex justify-center mt-2">
          <VoteStatus
            :amount="vm.myVote?.amount"
            :yes="vm.myVote?.vote"
            :token="vm.myVote?.token"
          />
        </div>
        <v-btn
          class="text-none btn-text px-6 mt-4 border-radius-8"
          @click="vm.releaseVotedToken()"
          :color="applicationStore.isDarkTheme ? 'gray11' : 'gray2'"
          >Release Your Token</v-btn
        >
      </div>
      <VoteConfrimDialog />
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { applicationStore } from "@/stores/application-store";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";
import { walletStore } from "@/stores/wallet-store";
@Observer
@Component({
  components: {
    Countdown: () => import("@/components/Countdown.vue"),
    VoteConfrimDialog: () => import("../dialog/Vote-Confirm-Dialog.vue"),
    VoteStatus: () => import("../components/VoteStatus.vue"),
  },
})
export default class Voting extends Vue {
  @Inject() vm!: ProposalDetailViewmodel;

  applicationStore = applicationStore;
  walletStore = walletStore;
}
</script>