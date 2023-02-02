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
      Discussion<span class="prime2--text ml-1"
        >({{ vm.comments?.length || 0 }})</span
      >
    </div>
    <v-form v-model="messageForm" ref="messageForm" v-if="!vm.isCommented">
      <div
        v-if="!walletStore.connected"
        class="
          py-12
          mt-4
          text-sm
          font-weight-regular
          mt-4
          text-center
          border-radius-8
        "
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
          :color="applicationStore.primaryColor"
          :disabled="vm.isCommented || !vm.isVoted"
          :placeholder="
            walletStore.connected && !vm.isVoted
              ? 'Please vote before write your comment'
              : 'Write your comment here'
          "
          v-model="vm.message"
          dense
          solo
          outlined
          no-resize
          :rules="[$rules.required]"
        ></v-textarea>
        <v-btn
          @click="onSendMessage()"
          :color="applicationStore.primaryColor"
          :disabled="!messageForm || vm.isCommented || !vm.isVoted"
          class="font-weight-bold text-capitalize rounded-lg px-4 mt-n1"
          >Send Comment</v-btn
        >
      </div>
    </v-form>
    <div v-else>
      <div
        class="pa-4 mt-4 text-sm font-weight-regular border-radius-8"
        :style="
          'background: ' +
          applicationStore.accentColor +
          ' !important;' +
          'border: 1px solid' +
          applicationStore.primaryColor +
          ' !important;'
        "
        :class="applicationStore.isDarkTheme ? 'white--text' : 'black--text'"
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
            <div class="d-flex">
              <div class="font-weight-bold">You</div>
              <!-- <v-icon small class="ml-2" :color="applicationStore.primaryColor"
                >mdi-launch</v-icon
              > -->
            </div>
            <div class="prime2--text text-overline-1 ml-1">
              {{ new Date(vm.myComment?.updatedAt) | normalizeTimeDuration }}
            </div>
          </div>
          <VoteStatus
            :small="true"
            :amount="vm.myVote?.amount"
            :yes="vm.myVote?.vote"
          />
        </div>
        <div class="mt-3">
          {{ vm.myComment?.content }}
        </div>
      </div>
    </div>
    <div class="mt-6" v-if="!vm.isReview">
      <div
        class="pa-4 mt-4 text-sm font-weight-regular border-radius-8"
        :style="'background: ' + applicationStore.accentColor + ' !important'"
        :class="
          applicationStore.isDarkTheme
            ? 'white--text box-border-gray11'
            : 'black--text'
        "
        :key="comment.id"
        v-for="comment in vm.slicedComments"
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
            <div class="d-flex">
              <div class="font-weight-bold">3Q3ph8KiL...RGvG8</div>
              <!-- <v-icon small class="ml-2" :color="applicationStore.primaryColor"
                >mdi-launch</v-icon
              > -->
            </div>
            <div class="prime2--text text-overline-1 ml-1">
              {{ new Date(comment?.updatedAt) | normalizeTimeDuration }}
            </div>
          </div>
          <VoteStatus
            :small="true"
            :amount="comment.vote?.amount"
            :yes="comment.vote?.vote"
          />
        </div>
        <div class="mt-3">
          {{ comment.content }}
        </div>
      </div>
      <div class="mt-4" v-if="vm.commentLength > 0">
        <v-pagination
          :color="applicationStore.primaryColor"
          :length="vm.totalCommentPage"
          :light="!applicationStore.isDarkTheme"
          :total-visible="7"
          v-model="vm.commentPage"
        >
        </v-pagination>
      </div>
    </div>
    <div
      class="pa-4 mt-4 text-sm font-weight-regular border-radius-8"
      :style="'background: ' + applicationStore.accentColor + ' !important'"
      :class="
        applicationStore.isDarkTheme
          ? 'white--text box-border-gray11'
          : 'black--text'
      "
      v-else
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
              <!-- <v-icon small class="ml-2" :color="applicationStore.primaryColor"
                >mdi-launch</v-icon
              > -->
            </div>
            <div class="prime2--text text-overline-1">2 months ago</div>
          </div>
        </div>
        <VoteStatus :small="true" />
      </div>
      <div class="mt-3">
        Situation deescalated a bit but could become dangerous again in a matter
        of hours. Voting in favor of SLND3 to have the ability to act, just in
        case. Hoping that we can give plenty of grace time for them to
        refinance.
      </div>
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

  messageForm = false;
  isMyComment = false;

  onSendMessage() {
    if (!(this.$refs.messageForm as any).validate()) {
      snackController.error("Please input your comment!");
      return;
    }
    this.vm.sendComment();
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
