<template>
  <v-card
    class="pa-4 border-radius-16 text-sm font-weight-regular"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="{
      background: applicationStore.cardBackground + ' !important',
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
              'background:' + applicationStore.pageBackground + ' !important'
            "
            v-if="!vm.isVoteDone"
          >
            <Countdown :targetDate="vm.voteEnd" />
          </div>
        </div>
        <div
          class="d-flex cursor-pointer align-center text-sm"
          :style="'color:' + applicationStore.primaryColor"
        >
          <span>View</span>
          <v-icon :color="applicationStore.primaryColor" small>
            mdi-chevron-right</v-icon
          >
        </div>
      </div>
      <div
        class="vote-info pa-4 mt-4"
        :style="'background:' + applicationStore.pageBackground + ' !important'"
      >
        <div class="d-flex justify-space-between">
          <div class="text-left">
            <div class="text-overline-1">VOTE</div>
            <div class="text-md font-weight-bold mt-1 success--text">YES</div>
            <div class="d-flex align-center text-xl font-weight-bold">
              <div>1,500,232</div>
              <div
                class="text-sm ml-2"
                :style="{ color: applicationStore.primaryColor }"
              >
                (75%)
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-overline-1">VOTE</div>
            <div class="text-md font-weight-bold mt-1 error--text">NO</div>
            <div class="d-flex align-center text-xl font-weight-bold">
              <div
                class="text-sm mr-2"
                :style="{ color: applicationStore.primaryColor }"
              >
                (25%)
              </div>
              <div>528,652</div>
            </div>
          </div>
        </div>
        <v-progress-linear
          background-color="error"
          color="success"
          value="75"
          class="rounded-xl mt-3"
          height="12px"
        ></v-progress-linear>
      </div>
      <div
        class="vote-info pa-4 mt-4"
        :style="'background:' + applicationStore.pageBackground + ' !important'"
        v-if="!vm.isVoteDone"
      >
        <div class="d-flex justify-space-between align-center">
          <div class="text-sm">Approval Quorum</div>
          <v-icon color="gray6">mdi-information-outline</v-icon>
        </div>
        <div class="font-weight-bold text-md">1 Yes vote required</div>
        <v-progress-linear
          height="12px"
          class="rounded-xl mt-2"
          value="100"
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
            @click="vm.changeVoteConfirmDialog(true)"
            :color="applicationStore.isDarkTheme ? 'gray11' : 'gray2'"
            :light="!applicationStore.isDarkTheme"
            :dark="applicationStore.isDarkTheme"
            elevation="0"
          >
            <div class="d-flex align-center">
              <v-icon color="success" class="mr-2 align-center"
                >mdi-thumb-up</v-icon
              >
              <div>Vote YES</div>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="6 pl-2">
          <v-btn
            class="full-width border-radius-8 text-none py-5"
            @click="vm.changeVoteConfirmDialog(false)"
            :color="applicationStore.isDarkTheme ? 'gray11' : 'gray2'"
            :light="!applicationStore.isDarkTheme"
            :dark="applicationStore.isDarkTheme"
            elevation="0"
          >
            <div class="d-flex align-center">
              <v-icon color="error" class="mr-2 align-center"
                >mdi-thumb-down</v-icon
              >
              <div>Vote NO</div>
            </div>
          </v-btn></v-col
        >
      </v-row>
      <div v-else class="mt-3 text-center">
        <v-btn class="btn-gray-11 px-4" @click="vm.gotoVoteResult()"
          >Release your Token</v-btn
        >
      </div>
      <VoteConfrimDialog />
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import Countdown from "@/components/Countdown.vue";
import VoteConfrimDialog from "../dialog/Vote-Confirm-Dialog.vue";
import { applicationStore } from "@/stores/application-store";
@Observer
@Component({
  components: {
    Countdown,
    VoteConfrimDialog,
  },
})
export default class Voting extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>
<style scoped>
.vote-info {
  opacity: 0.8;
  border-radius: 8px;
}
</style>