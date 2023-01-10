<template>
  <v-card
    class="pa-4 border-radius-16"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important'"
    elevation="0"
    outlined
  >
    <div class="text-lg font-weight-bold">
      Discussion<span class="prime2--text ml-1">(38)</span>
    </div>
    <v-form ref="messageForm">
      <div
        v-if="!walletStore.connected"
        class="py-12 mt-4 text-sm font-weight-regular mt-4 text-center border-radius-8"
        :style="'background: ' + applicationStore.accentColor + ' !important'"
        :class="
          applicationStore.isDarkTheme
            ? 'white--text box-border-gray11'
            : 'black--text'
        "
      >
        <div>You can share your thoughts after connecting your wallet</div>
        <div class="mt-4">
          <ConnectMetamask :requiredChainId="walletStore.chainId" />
        </div>
      </div>
      <div class="mt-3" v-else>
        <v-textarea
          class="input-field border-radius-8 elevation-0 overflow-hidden"
          color="primary"
          placeholder="Input your comment"
          v-model="vm.message"
          dense
          solo
          outlined
          no-resize
          :rules="[$rules.required]"
        ></v-textarea>
        <div class="d-flex justify-left">
          <v-btn
            @click = "onSendMessage()"
            :color="applicationStore.primaryColor"
            class="font-weight-bold text-capitalize rounded-lg px-4"
            >Send</v-btn
          >
        </div>
      </div>
    </v-form>
    <div
      class="pa-4 mt-4 text-sm font-weight-regular border-radius-8"
      :style="'background: ' + applicationStore.accentColor + ' !important'"
      :class="
        applicationStore.isDarkTheme
          ? 'white--text box-border-gray11'
          : 'black--text'
      "
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
import ConnectMetamask from "@/components/wallet/ConnectMetamask.vue";
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";
import { snackController } from "@/components/snack-bar/snack-bar-controller";

@Observer
@Component({
  components: {
    ConnectMetamask,
    VoteStatus: () => import("../components/VoteStatus.vue"),
  },
})
export default class DetailProposalDiscussion extends Vue {
  @Inject() vm!: ProposalDetailViewmodel;

  walletStore = walletStore;
  applicationStore = applicationStore;

  onSendMessage() {
    if (!(this.$refs.messageForm as any).validate()) {
      snackController.error("Please input message!");
      return;
    }
    this.vm.sendMessage();
  }
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
