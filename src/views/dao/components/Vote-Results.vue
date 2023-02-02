<template>
  <v-card
    class="
      vote-result
      pa-4
      border-radius-16
      text-sm
      font-weight-regular
      mx-auto
    "
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
    <div class="d-flex justify-space-between align-center">
      <div class="pa-0 cursor-pointer" text @click="vm.toggleVoteResult()">
        <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
        <span class="text-capitalize blueJeans--text">Back</span>
      </div>
      <!-- <div class="pa-0 cursor-pointer">
        <v-icon class="ml-4" :color="applicationStore.primaryColor"
          >mdi-launch</v-icon
        >
      </div> -->
    </div>
    <div class="d-flex justify-space-between align-center mt-3">
      <div class="text-dp-xs font-weight-bold">
        SLND3: Introduce Account Borrow Limit
      </div>
      <div>
        <ProposalStatus :status="vm.proposal?.status" />
      </div>
    </div>
    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <div
          class="pa-4 border-radius-8"
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
      </v-col>
      <v-col cols="12" md="3">
        <div
          class="
            pa-4
            border-radius-8
            full-height
            d-flex
            flex-column
            justify-center
            align-center
          "
          :style="'background:' + applicationStore.accentColor + ' !important'"
          :class="
            applicationStore.isDarkTheme
              ? 'white--text box-border-gray11'
              : 'black--text'
          "
        >
          <div class="text-caption gray6--text">VOTING TIME REMAINING</div>
          <div class="font-weight-bold text-dp-xs mt-1">
            {{ days }}d : {{ hours | twoDigits }}h : {{ minutes | twoDigits }}m
            : {{ seconds | twoDigits }}s
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div
          class="
            pa-4
            border-radius-8
            full-height
            d-flex
            flex-column
            justify-center
            align-center
          "
          :style="'background:' + applicationStore.accentColor + ' !important'"
          :class="
            applicationStore.isDarkTheme
              ? 'white--text box-border-gray11'
              : 'black--text'
          "
        >
          <div class="text-caption gray6--text">SIGNATORIES (1/1)</div>
          <div class="text-lg font-weight-bold d-flex mt-1">
            {{ vm.ownerAddress | truncateAddress(4, 6) }}
            <!-- <span
              ><v-icon class="ml-2" :color="applicationStore.primaryColor" small
                >mdi-launch</v-icon
              ></span
            > -->
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <div class="text-lg font-weight-bold pt-3">Top Voters</div>
          <v-checkbox
            v-model="vm.filterYesResult"
            :light="applicationStore.isDarkTheme ? false : true"
            :color="applicationStore.primaryColor"
            label="Yes"
            class="ml-4 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.filterNoResult"
            :light="applicationStore.isDarkTheme ? false : true"
            :color="applicationStore.primaryColor"
            label="No"
            class="ml-2 pt-0"
            hide-details
          ></v-checkbox>
        </div>
        <div
          class="border-radius-8 overflow-hidden mt-4"
          :style="'background:' + applicationStore.accentColor + ' !important'"
          :class="
            applicationStore.isDarkTheme
              ? 'white--text box-border-gray11'
              : 'black--text'
          "
        >
          <v-data-table
            :items="vm.top10Votes"
            :headers="resultTableHeaders"
            :style="
              'background:' + applicationStore.accentColor + ' !important'
            "
            hide-default-footer
            :light="applicationStore.isDarkTheme ? false : true"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  :style="{
                    background:
                      index % 2 == 0
                        ? applicationStore.cardColor
                        : applicationStore.accentColor + ' !important',
                  }"
                  v-for="(item, index) in items"
                  :key="item.id"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.user?.address | truncateAddress(4, 6) }}</td>
                  <td>
                    <div class="d-flex align-center" v-if="item.vote">
                      <v-icon class="mr-1" color="success" small
                        >mdi-thumb-up-outline</v-icon
                      >
                      Yes
                    </div>
                    <div class="d-flex align-center" v-else>
                      <v-icon class="mr-1" color="error" small
                        >mdi-thumb-down-outline</v-icon
                      >
                      No
                    </div>
                  </td>
                  <td class="text-center">
                    {{ item.amount | formatNumber(2) }}
                  </td>
                  <td class="text-end font-weight-bold">
                    {{ item.percentage | formatNumber(2) }}%
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-lg font-weight-bold pt-3">Graph</div>
        <div
          class="graph-area d-flex justify-center align-center mt-4"
          :style="'background:' + applicationStore.accentColor + ' !important'"
          :class="
            applicationStore.isDarkTheme
              ? 'white--text box-border-gray11'
              : 'black--text'
          "
        >
          <PieChart
            :options="chartOptions"
            :labels="vm.top10Labels"
            :series="vm.top10Amounts"
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue, Prop } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import PieChart from "@/components/PieChart.vue";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";
import { applicationStore } from "@/stores/application-store";
import { action } from "mobx";

@Observer
@Component({
  components: {
    PieChart,
    ProposalStatus: () => import("../components/ProposalStatus.vue"),
  },
})
export default class VoteResult extends Vue {
  @Inject() vm!: ProposalDetailViewmodel;
  @Prop() targetDate!: string;
  applicationStore = applicationStore;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  millisecondsInOneSecond = 1000;
  millisecondsInOneMinute = 1000 * 60;
  millisecondsInOneHour = 1000 * 60 * 60;
  millisecondsInOneDay = 1000 * 60 * 60 * 24;
  timer = setInterval(() => this.startTimer(), 1000);

  @action startTimer() {
    const timeNow = new Date().getTime();
    const result = new Date(this.targetDate).getTime();
    const timeDifference = result - timeNow;
    if (timeDifference < 0) {
      clearInterval(this.timer);
    }
    const differenceInDays = timeDifference / this.millisecondsInOneDay;
    const remainderDifferenceInHours =
      (timeDifference % this.millisecondsInOneDay) / this.millisecondsInOneHour;
    const remainderDifferenceInMinutes =
      (timeDifference % this.millisecondsInOneHour) /
      this.millisecondsInOneMinute;
    const remainderDifferenceInSeconds =
      (timeDifference % this.millisecondsInOneMinute) /
      this.millisecondsInOneSecond;
    this.days = Math.floor(differenceInDays);
    this.hours = Math.floor(remainderDifferenceInHours);
    this.minutes = Math.floor(remainderDifferenceInMinutes);
    this.seconds = Math.floor(remainderDifferenceInSeconds);
  }
  resultTableHeaders = [
    {
      text: "",
      align: "start",
      sortable: false,
      value: "index",
    },
    {
      text: "Account",
      align: "start",
      sortable: false,
      value: "user.address",
    },
    {
      text: "Vote",
      align: "center",
      sortable: false,
      value: "vote",
    },
    {
      text: "Vote Weight",
      align: "center",
      sortable: false,
      value: "voteAmount",
    },
    {
      text: "Percentage",
      align: "end",
      sortable: false,
      value: "votePercent",
    },
  ];

  chartOptions = {
    chart: {
      type: "pie",
    },
    legend: {
      show: false,
    },
  };
}
</script>
<style scoped>
.vote-result {
  max-width: 1400px;
}
.vote-info {
  background: #1e1e20;
  opacity: 0.8;
  border: 1px solid #3b3b3f !important;
  border-radius: 8px;
}
.border {
  /* Color/Emerald */
  border: 1px solid #65c77c;
}
.table {
  /* Grey/10 */
  border: 1px solid #4f4f54;
  border-radius: 12px;
}
.graph-area {
  width: 100%;
  min-height: 544px;
  background: #1e1e20;
  border-radius: 12px;
}
</style>
