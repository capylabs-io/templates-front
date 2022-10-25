<template>
  <div class="pa-4 box-gray-13 mt-4 text-sm font-weight-regular gray8--text min-height">
    <v-row class="justify-space-between">
      <v-col cols="10">
        <div class="relative d-flex full-width box-gray-12 rounded-lg h-36">
          <v-icon class="absolute top-left pl-1" color="gray7"
            >mdi-magnify</v-icon
          >
          <input
            type="text"
            name="search"
            placeholder="Search"
            class="absolute top-left h-36 full-width pl-10 white--text"
          />
        </div>
      </v-col>
      <v-col cols="2" class="relative">
        <v-btn class="box-gray-12 rounded-lg" @click="isFilter = !isFilter">
          <div class="full-width">
            <span class="text-capitalize gray6--text mr-1">Filter</span>
            <v-icon small color="gray6"> mdi-chevron-down</v-icon>
          </div>
        </v-btn>
        <div v-if="isFilter" class="absolute filter-component pa-3 text-left">
          <v-checkbox
            v-model="checkbox"
            value="Cancelled"
            label="Cancelled"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="Completed"
            label="Completed"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="Defeated"
            label="Defeated"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="Draft"
            label="Draft"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="Excuting"
            label="Excuting"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="ExcutingWithErrors"
            label="ExcutingWithErrors"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="SigningOff"
            label="SigningOff"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="Succeeded"
            label="Succeeded"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="Voting"
            label="Voting"
            class="mt-3 pt-0"
            hide-details
          ></v-checkbox>
        </div>
      </v-col>
    </v-row>
    <AddProposal />
    <div class="d-flex justify-space-between mt-4">
      <div class="gray7--text">3 Proposals</div>
      <div
        class="blueJeans--text d-flex align-center cursor-pointer"
        @click="vm.changeAddProposalDialog()"
      >
        <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
        <span class="ml-1 align-self-end">New Proposals</span>
      </div>
    </div>
    <div
      class="
        d-flex
        justify-space-between
        pa-4
        gray12
        cursor-pointer
        align-center
        mt-3
        rounded-lg
        cursor-pointer
      "
      @click="vm.gotoProposalDetail()"
    >
      <div>
        <div class="text-lg white--text">
          SLND3: Introduce Account Borrow Limit
        </div>
        <div>Succeeded 3 months ago</div>
      </div>
      <div>
        <v-btn outlined color="emerald" small>
          <div class="d-flex align-center">
            <v-icon>mdi-check</v-icon>
            <div class="text-capitalize align-seft-center">Succeeded</div>
          </div>
        </v-btn>
        <v-icon color="gray6 ml-6"> mdi-chevron-right</v-icon>
      </div>
    </div>
    <div
      class="
        d-flex
        justify-space-between
        pa-4
        gray12
        cursor-pointer
        align-center
        mt-3
        rounded-lg
      "
    >
      <div>
        <div class="text-lg white--text">SLND1: Mitigate Risk From Whale</div>
        <div>Succeeded 4 months ago</div>
      </div>
      <div>
        <v-btn outlined color="emerald" small>
          <div class="d-flex align-center">
            <v-icon>mdi-check</v-icon>
            <div class="text-capitalize align-seft-center">Succeeded</div>
          </div>
        </v-btn>
        <v-icon color="gray6 ml-6"> mdi-chevron-right</v-icon>
      </div>
    </div>
    <div
      class="
        d-flex
        justify-space-between
        pa-4
        gray12
        cursor-pointer
        align-center
        mt-3
        rounded-lg
      "
    >
      <div>
        <div class="text-lg white--text">
          SLND2: Invalidate SLND1 and Increase Voting Time
        </div>
        <div>Succeeded 4 months ago</div>
      </div>
      <div>
        <v-btn outlined color="emerald" small>
          <div class="d-flex align-center">
            <v-icon>mdi-check</v-icon>
            <div class="text-capitalize align-seft-center">Succeeded</div>
          </div>
        </v-btn>
        <v-icon color="gray6 ml-6"> mdi-chevron-right</v-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { observable } from "mobx";
import { DaoViewModel } from "../models/dao-viewmodels";
import AddProposal from "../dialog/Add-Proposal.vue";
@Observer
@Component({
  components: {
    AddProposal,
  },
})
export default class Proposals extends Vue {
  @observable checkbox;
  @observable isFilter = false;
  @Inject() vm!: DaoViewModel;
}
</script>
<style scoped>
.top-left {
  top: 0;
  left: 0;
}
.filter-component {
  top: 3.25rem;
  left: -5.5rem;
  /* Grey/11 */
  width: 200px;
  height: auto;
  background: #3b3b3f;
  /* Grey/10 */
  border: 1px solid #4f4f54;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  z-index: 100;
}
.min-height {
  min-height: calc(100vh - 310px);
}
</style>