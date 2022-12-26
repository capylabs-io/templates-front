<template>
  <v-card
    class="pa-4 border-radius-16"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardBackground + ' !important'"
    elevation="0"
    outlined
  >
    <div class="text-lg font-weight-bold">
      Discussion<span class="prime2--text ml-1">(38)</span>
    </div>
    <div
      class="
        py-12
        mt-4
        text-sm
        font-weight-regular
        mt-4
        text-center
        border-radius-8
      "
      :style="'background: ' + applicationStore.pageBackground + ' !important'"
    >
      <div>You can share your thoughts after connecting your wallet</div>
      <div class="mt-4">
        <ConnectMetamask />
      </div>
    </div>
    <div
      class="pa-4 mt-4 text-sm font-weight-regular border-radius-8"
      :style="'background: ' + applicationStore.pageBackground + ' !important'"
    >
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <div
            class="rounded-circle mr-2"
            :style="
              'background: ' + applicationStore.primaryColor + ' !important'
            "
          >
            <v-icon>mdi-account-circle</v-icon>
          </div>
          <div>
            <div class="d-flex">
              <div class="font-weight-bold">3Q3ph8KiL...RGvG8</div>
              <v-icon small class="ml-2" :color="applicationStore.primaryColor"
                >mdi-launch</v-icon
              >
            </div>
            <div class="prime2--text text-overline-1">2 months ago</div>
          </div>
        </div>
        <VoteStatus />
      </div>
      <div class="mt-3">
        Situation deescalated a bit but could become dangerous again in a matter
        of hours. Voting in favor of SLND3 to have the ability to act, just in
        case. Hoping that we can give plenty of grace time for them to
        refinance.
      </div>
    </div>
    <div class="mt-4">
      <v-pagination
        :color="applicationStore.primaryColor"
        :length="vm.totalPage"
        :total-visible="vm.pageSize"
        :dark="applicationStore.isDarkTheme"
        :light="!applicationStore.isDarkTheme"
        v-model="vm.currentPage"
      >
      </v-pagination>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";
import ConnectMetamask from "@/components/wallet/ConnectMetamask.vue";
import { applicationStore } from "@/stores/application-store";

@Observer
@Component({
  components: {
    ConnectMetamask,
    VoteStatus: () => import("../components/VoteStatus.vue"),
  },
})
export default class DetailProposalDiscussion extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>
<style scoped>
.straight-line {
  width: 1px;
  height: 100%;
  /* Prime/60 */
  background: #474747;
}
</style>