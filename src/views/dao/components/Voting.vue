<template>
  <v-card
    class="
      pa-4
      box-gray-12
      rounded-lg
      text-sm
      font-weight-regular
      gray6--text
      mt-4
    "
    outlined
  >
    <div v-if="!vm.isVoted">
      <div class="d-flex justify-space-between text-lg white--text">
        <div class="font-weight-bold">Voting now</div>
        <div class="gray13 align-center px-3">
          2d : 23h : 59m
          <!-- <Countdown :targetDate="vm.voteEnd" /> -->
        </div>
      </div>
      <div class="vote-info pa-4 mt-3">
        <div class="d-flex justify-space-between">
          <div>Approval Quorum</div>
          <v-icon color="gray6">mdi-information-outline</v-icon>
        </div>
        <div class="font-weight-bold text-dp-xs white--text">
          1 Yes vote required
        </div>
        <v-progress-linear
          color="gray11"
          height="12px"
          class="rounded-xl mt-2"
          value="100"
        ></v-progress-linear>
      </div>
      <div class="vote-info pa-4 mt-3">
        <div class="d-flex justify-space-between">
          <div>
            <div class="text-overline-1">VOTE</div>
            <div class="text-md gray3--text font-weight-bold">YES</div>
            <div class="text-xl white--text font-weight-bold">
              1,500,232<span class="text-sm gray6--text">(75%)</span>
            </div>
          </div>
          <div>
            <div class="text-overline-1">VOTE</div>
            <div class="text-md gray3--text font-weight-bold">NO</div>
            <div class="text-xl white--text font-weight-bold">
              528,652<span class="text-sm gray6--text">(25%)</span>
            </div>
          </div>
        </div>
        <v-progress-linear
          background-color="error"
          color="emerald"
          value="75"
          class="rounded-xl mt-2"
          height="12px"
        ></v-progress-linear>
      </div>
      <div class="text-lg white--text text-center mt-4">Cast your vote</div>
      <v-row class="justify-center mt-3">
        <v-col cols="6 pr-2">
          <v-btn class="btn-gray-11 full-width" @click="vm.voting()">
            <div class="d-flex">
              <v-icon color="emerald" class="mr-2 align-center"
                >mdi-thumb-up-outline</v-icon
              >
              <div>Vote YES</div>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="6 pl-2">
          <v-btn class="btn-gray-11 full-width" @click="vm.voting()">
            <div class="d-flex">
              <v-icon color="error" class="mr-2 align-center"
                >mdi-thumb-down-outline</v-icon
              >
              <div>Vote NO</div>
            </div>
          </v-btn></v-col
        >
      </v-row>
    </div>
    <div class="white--text" v-else>
      <div class="font-weight-bold text-lg">Result</div>
      <div class="d-flex my-3 justify-center">
        <v-icon color="emerald" class="mr-1">mdi-checkbox-marked-circle</v-icon>
        <div>The proposal has passed!</div>
      </div>
      <div class="vote-info pa-4 mt-3">
        <div class="d-flex justify-space-between">
          <div>
            <div class="text-overline-1">VOTE</div>
            <div class="text-md gray3--text font-weight-bold">YES</div>
            <div class="text-xl white--text font-weight-bold">
              1,500,232<span class="text-sm gray6--text">(75%)</span>
            </div>
          </div>
          <div>
            <div class="text-overline-1">VOTE</div>
            <div class="text-md gray3--text font-weight-bold">NO</div>
            <div class="text-xl white--text font-weight-bold">
              528,652<span class="text-sm gray6--text">(25%)</span>
            </div>
          </div>
        </div>
        <v-progress-linear
          background-color="error"
          color="emerald"
          value="75"
          class="rounded-xl mt-2"
          height="12px"
        ></v-progress-linear>
      </div>
      <div class="mt-3 text-center">
        <v-btn class="btn-gray-11 px-4" @click="vm.gotoVoteResult()"
          >Release your Token</v-btn
        >
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
// import Countdown from "@/components/Countdown.vue";
@Observer
@Component({
  components: {},
})
export default class Voting extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>
<style scoped>
.vote-info {
  background: #1e1e20;
  opacity: 0.8;
  border: 1px solid #3b3b3f !important;
  border-radius: 8px;
}
</style>