<template>
  <div class="box-gray-12 pa-2 my-4">
    <div class="d-flex justify-space-between">
      <div class="pa-0 cursor-pointer" text @click="vm.backPropoDetail()">
        <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
        <span class="text-capitalize blueJeans--text">Back</span>
      </div>
      <div class="pa-0 cursor-pointer">
        <v-icon class="ml-4" color="blueJeans">mdi-launch</v-icon>
      </div>
    </div>
    <div class="d-flex justify-space-between mt-3">
      <div class="text-lg white--text font-weight-bold">
        SLND3: Introduce Account Borrow Limit
      </div>
      <div text class="text-sm px-2 border border-radius-4">
        <v-icon color="emerald">mdi-check</v-icon>
        <span class="text-capitalize emerald--text ml-1">Succeeded</span>
      </div>
    </div>
    <v-row class="mt-4">
      <v-col cols="12" md="6" class="pr-2">
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
        <div class="d-flex align-end">
          <div class="text-lg">Top Voters</div>
          <v-checkbox
            value="Yes"
            label="Yes"
            class="mt-3 mx-4 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            value="No"
            label="No"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
        </div>
        <v-simple-table class="table my-4">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Account</th>
                <th class="text-left">Vote</th>
                <th class="text-left">Vote Weight</th>
                <th class="text-left">%</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gray12">
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr class="gray12">
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr class="gray12">
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr class="gray12">
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="error" class="mr-2 align-center"
                      >mdi-thumb-down-outline</v-icon
                    >
                    <div>Vote NO</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr class="gray12">
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="error" class="mr-2 align-center"
                      >mdi-thumb-down-outline</v-icon
                    >
                    <div>Vote NO</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>3Q3ph...RGvG8</td>
                <td>
                  <div class="d-flex">
                    <v-icon color="emerald" class="mr-2 align-center"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <div>Vote YES</div>
                  </div>
                </td>
                <td>1.005.754,343</td>
                <td>40%</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" md="6" class="pl-2">
        <div class="d-flex justify-space-between text-caption gray-6">
          <div class="pr-2">
            <div class="gray13 border-radius-12 py-8 px-16 text-center">
              <div>VOTING TIME REMAINING</div>
              <div class="white--text text-dp-md">00:00:00</div>
            </div>
          </div>
          <div class="pl-2">
            <div class="gray13 border-radius-12 py-10 px-16 text-center">
              <div>SIGNATORIES (1/1)</div>
              <div class="white--text text-lg font-weight-bold d-flex">
                3Q3ph...RGvG8
                <span
                  ><v-icon class="ml-4" color="blueJeans"
                    >mdi-launch</v-icon
                  ></span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="white--text text-lg font-weight-bold my-3">Graph</div>
        <div class="graph-area d-flex justify-center align-center">
            <PieChart/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import PieChart from "@/components/PieChart.vue";
@Observer
@Component({
  components: {
    PieChart,
  },
})
export default class VoteResult extends Vue {
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
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}
</style>