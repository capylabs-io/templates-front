<template>
  <div
    class="pa-4 border-radius-8 mt-4 text-sm font-weight-regular gray8--text"
    :class="
      applicationStore.isDarkTheme
        ? 'white--text box-border-gray11'
        : 'black--text'
    "
    :style="'background:' + applicationStore.accentColor"
  >
    <div class="d-flex align-center">
      <v-text-field
        v-model="vm.searchKey"
        class="border-radius-8"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Proposals"
        :color="applicationStore.primaryColor"
        :light="!applicationStore.isDarkTheme"
        clearable
        solo
        dense
        hide-details
      ></v-text-field>
      <v-menu :close-on-content-click="false" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="rounded-lg ml-4 text-none"
            :color="applicationStore.cardColor"
            :class="
              applicationStore.isDarkTheme ? 'white--text' : 'black--text'
            "
            elevation="0"
            v-bind="attrs"
            v-on="on"
          >
            <span class="text-capitalize mr-1">Filter</span>
            <v-icon small color="gray6"> mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list
          :color="applicationStore.cardColor"
          :dark="applicationStore.isDarkTheme"
          :light="!applicationStore.isDarkTheme"
          dense
        >
          <v-list-item>
            <v-checkbox
              v-model="vm.filterCancelled"
              label="Cancelled"
              :color="applicationStore.primaryColor"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterPassed"
              label="Passed"
              :color="applicationStore.primaryColor"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterFailed"
              label="Failed"
              :color="applicationStore.primaryColor"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterExecuting"
              label="Executing"
              :color="applicationStore.primaryColor"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterOnHold"
              label="Succeeded"
              :color="applicationStore.primaryColor"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterVoting"
              label="Voting"
              :color="applicationStore.primaryColor"
              hide-details
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="vm.filterDraft"
              label="Draft"
              :color="applicationStore.primaryColor"
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
        <v-icon small :color="applicationStore.primaryColor"
          >mdi-plus-circle-outline</v-icon
        >
        <span
          class="ml-1 align-self-end"
          :style="'color:' + applicationStore.primaryColor"
          >New Proposals</span
        >
      </div>
    </div>

    <div v-for="proposal in vm.slicedProposals" :key="proposal.id">
      <Responsive :breakpoints="{ small: (el) => el.width <= 600 }">
        <div
          class="
            d-flex
            justify-space-between
            pa-4
            cursor-pointer
            align-center
            mt-3
            rounded-lg
          "
          :style="'background:' + applicationStore.cardColor"
          @click="vm.gotoProposalDetail()"
          slot-scope="el"
        >
          <div :class="el.is.small ? 'small-proposal-title' : 'proposal-title'">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="text-lg text-truncate font-weight-bold"
                  :class="
                    applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                  "
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ proposal.title }}
                </div>
              </template>
              <span> {{ proposal.title }}</span>
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

    <div
      class="d-flex justify-center py-16 text-dp-xs"
      v-if="!vm.proposals || vm.proposals.length == 0"
    >
      No Proposal Found!
    </div>

    <div class="mt-3">
      <v-pagination
        v-model="vm.proposalPage"
        :length="vm.totalProposalPage"
        :color="applicationStore.primaryColor"
        :light="!applicationStore.isDarkTheme"
        :dark="applicationStore.isDarkTheme"
      ></v-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";
import { applicationStore } from "@/stores/application-store";

@Observer
@Component({
  components: {
    Responsive,
    ProposalStatus: () => import("./ProposalStatus.vue"),
  },
})
export default class Proposals extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
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