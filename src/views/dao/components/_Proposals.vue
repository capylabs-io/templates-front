<template>
  <div class="pa-4 box-gray-13 mt-4 text-sm font-weight-regular gray8--text">
    <div class="d-flex align-center">
      <v-text-field
        v-model="vm.searchKey"
        class="border-radius-8"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Proposals"
        clearable
        outlined
        dense
        hide-details
      ></v-text-field>
      <v-menu :close-on-content-click="false" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="rounded-lg ml-4 text-none"
            color="gray12"
            elevation="0"
            v-bind="attrs"
            v-on="on"
          >
            <span class="text-capitalize gray6--text mr-1">Filter</span>
            <v-icon small color="gray6"> mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterCancelled"
              label="Cancelled"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterPassed"
              label="Passed"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterFailed"
              label="Failed"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterExecuting"
              label="Executing"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterOnHold"
              label="Succeeded"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterVoting"
              label="Voting"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterDraft"
              label="Draft"
              hide-details
            ></v-checkbox>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="d-flex justify-space-between mt-4">
      <div class="gray7--text">{{ vm.proposalLength }} Proposals</div>
      <div
        class="blueJeans--text d-flex align-center cursor-pointer"
        @click="vm.changeAddProposalDialog()"
      >
        <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
        <span class="ml-1 align-self-end">New Proposals</span>
      </div>
    </div>

    <div v-for="proposal in vm.slicedProposals" :key="proposal.id">
      <Responsive :breakpoints="{ small: (el) => el.width <= 600 }">
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
          @click="vm.gotoProposalDetail()"
          slot-scope="el"
        >
          <div :class="el.is.small ? 'small-proposal-title' : 'proposal-title'">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="text-lg white--text text-truncate"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ proposal.title }}
                </div>
              </template>
              <span>
                SLND3: Introduce Account Borrow Limit fdsafdas fdasfdsfds f
                fdasfdsa</span
              >
            </v-tooltip>
            <div>
              {{ new Date(proposal.updatedAt) | normalizeTimeDuration }}
            </div>
          </div>
          <div class="d-flex align-center ml-4">
            <proposal-status :status="proposal.status" :isSmall="el.is.small" />
            <v-icon class="ml-4" color="gray6"> mdi-chevron-right</v-icon>
          </div>
        </div>
      </Responsive>
    </div>

    <div class="mt-3">
      <v-pagination
        v-model="vm.proposalPage"
        :length="vm.totalProposalPage"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";

@Observer
@Component({
  components: {
    Responsive,
    ProposalStatus: () => import("./ProposalStatus.vue"),
  },
})
export default class Proposals extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>
<style scoped>
.top-left {
  top: 0;
  left: 0;
}
.filter-component {
  top: 2.5rem;
  /* Grey/11 */
  height: auto;
  background: #3b3b3f;
  /* Grey/10 */
  border: 1px solid #4f4f54;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  z-index: 100;
}

.proposal-title {
  width: calc(100% - 166px - 16px * 2) !important;
}
.small-proposal-title {
  width: calc(100% - 92px - 16px * 2) !important;
}
</style>