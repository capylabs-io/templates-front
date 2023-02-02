<template>
  <v-card
    class="pa-6 border-radius-16 member-card mx-auto mt-8 mb-5"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important;'"
    :outlined="applicationStore.isDarkTheme"
    elevation="0"
  >
    <v-btn
      class="px-0 ml-n2"
      @click="vm.setpickMembers(false), vm.setpickDao(true)"
      text
    >
      <v-icon :color="applicationStore.primaryColor" small>
        mdi-chevron-left</v-icon
      >
      <span
        :style="'color:' + applicationStore.primaryColor + ' !important'"
        class="text-capitalize onCursor"
        >Back</span
      >
    </v-btn>

    <div>
      <div class="d-flex align-center mt-3">
        <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
        <span class="font-weight-bold text-md">{{
          applicationStore.application?.name || "Your Application Name"
        }}</span>
      </div>
      <div class="text-dp-xs font-weight-bold mt-1">Members</div>
    </div>
    <v-row class="mt-1">
      <v-col cols="12" md="6" class="text-sm">
        <div
          class="
            border-radius-16
            pa-4
            full-height
            d-flex
            flex-column
            justify-space-between
          "
          :class="{
            'box-border-gray11': applicationStore.isDarkTheme,
          }"
          :style="'background:' + applicationStore.accentColor + ' !important'"
        >
          <div>
            <div class="d-flex justify-space-between">
              <div class="">
                {{ vm.daoMembers.length }}
                members
              </div>

              <div
                class="blueJeans--text d-flex justify-center cursor-pointer"
                @click="vm.pickAddMembers = !vm.pickAddMembers"
              >
                <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
                <span class="ml-1">New Member</span>
                <!-- add member call api /application/:appid method put -->
              </div>
            </div>
            <div class="mt-2">
              <v-text-field
                class="input-field border-radius-8 elevation-0"
                v-model="vm.memberSearchKey"
                placeholder="Search Member"
                :light="!applicationStore.isDarkTheme"
                :color="applicationStore.primaryColor"
                hide-details
                dense
                solo
                clearable
              ></v-text-field>
            </div>
            <div
              class="mt-4"
              v-for="member in vm.filteredMembers"
              :key="member"
            >
              <v-card
                class="members-list d-flex pa-4 border-radius-8"
                @click="getUsersVote(member)"
                :color="applicationStore.cardColor"
                :class="
                  applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                "
              >
                <div>
                  <div class="prime7 pa-1 rounded-circle mr-2">
                    <v-icon color="prime2">mdi-account-circle</v-icon>
                  </div>
                </div>
                <div class="pa-1">
                  <div class="font-weight-bold">{{ member }}</div>
                </div>
              </v-card>
            </div>
          </div>
          <div class="mt-4">
            <v-pagination
              v-model="vm.memberPage"
              :length="vm.totalMemberPage"
              :color="applicationStore.primaryColor"
              :light="!applicationStore.isDarkTheme"
            ></v-pagination>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="text-sm">
        <div
          class="
            border-radius-16
            pa-4
            full-height
            d-flex
            flex-column
            justify-space-between
          "
          :class="{ 'box-border-gray11': applicationStore.isDarkTheme }"
          :style="'background:' + applicationStore.accentColor + ' !important'"
        >
          <div>
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">
                {{ vm.currentMember | truncateAddress(6, 10) }}
              </div>
              <div
                class="
                  blueJeans--text
                  d-flex
                  justify-center
                  cursor-pointer
                  gray6--text
                "
              >
                <span class="mr-1">Explore</span>
                <v-icon small color="blueJeans">mdi-launch</v-icon>
              </div>
            </div>
            <div class="d-flex gap-20 mt-4">
              <v-card
                class="
                  d-flex
                  flex-column
                  justify-space-between
                  pa-4
                  w-50
                  row-gap-10
                  border-radius-16
                "
                :color="applicationStore.cardColor"
                :class="
                  applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                "
              >
                <!-- sum of votes amount -->
                <div>
                  <div class="font-weight-bold text-md">Votes (amount)</div>
                  <div class="font-weight-bold text-dp-xs">
                    {{ vm.votesAmount }}
                  </div>
                </div>
              </v-card>
              <v-card
                class="
                  d-flex
                  flex-column
                  justify-space-between
                  pa-4
                  w-50
                  row-gap-10
                  border-radius-16
                "
                :color="applicationStore.cardColor"
                :class="
                  applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                "
              >
                <div>
                  <div class="font-weight-bold text-md">Votes Cast</div>
                  <div class="font-weight-bold text-dp-xs">
                    {{ vm.numberOfVotes }}
                  </div>
                </div>
                <div class="d-flex gap-20">
                  <div class="d-flex align-center">
                    <v-icon color="success" class="mr-2 align-center"
                      >mdi-thumb-up</v-icon
                    >
                    <div>Yes: {{ vm.votesYes }}</div>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="error" class="mr-2 align-center"
                      >mdi-thumb-down</v-icon
                    >
                    <div>No: {{ vm.votesNo }}</div>
                  </div>
                </div>
              </v-card>
            </div>
            <div class="pt-4">{{ vm.comments.length }} recent comments</div>
            <div v-for="comment in vm.comments" :key="comment.id">
              <v-card
                class="
                  d-flex
                  flex-column
                  pa-4
                  cursor-pointer
                  mt-3
                  rounded-lg
                  w-100
                "
                :color="applicationStore.cardColor"
                :class="
                  applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                "
              >
                <div class="d-flex justify-space-between">
                  <div :class="'small-proposal-title'">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          class="text-lg text-truncate font-weight-bold"
                          :class="
                            applicationStore.isDarkTheme
                              ? 'white--text'
                              : 'black--text'
                          "
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ comment.proposal?.title }}
                        </div>
                      </template>
                      <span>{{ comment.proposal?.title }}</span>
                    </v-tooltip>
                    <div>{{ comment.createdAt | datetime }}</div>
                  </div>
                  <div class="d-flex align-center ml-4">
                    <VoteStatus
                      :amount="comment.vote.amount"
                      :yes="comment.vote.vote"
                      :token="comment.vote.token"
                      :small="true"
                    />
                    <v-icon class="ml-4" color="gray6">
                      mdi-chevron-right</v-icon
                    >
                  </div>
                </div>
                <div
                  class="d-flex gap-20 pa-4 rounded-lg mt-4"
                  :style="'background:' + applicationStore.accentColor"
                >
                  <v-icon color="gray6"> mdi-chat-outline </v-icon>
                  <div>
                    {{ comment.content }}
                  </div>
                </div>
              </v-card>
            </div>
          </div>

          <div class="mt-4">
            <v-pagination
              v-model="vm.commentPage"
              :length="vm.totalCommentPage"
              :color="applicationStore.primaryColor"
              :light="!applicationStore.isDarkTheme"
            ></v-pagination>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";
@Observer
@Component({
  components: {
    MemberStatus: () => import("./MemberStatus.vue"),
    VoteStatus: () => import("./VoteStatus.vue"),
  },
})
export default class Members extends Vue {
  @Inject() vm!: DaoViewModel;
  applicationStore = applicationStore;
  walletStore = walletStore;
  hover = false;
  getUsersVote(address) {
    this.vm.fetchUserInteract(address);
  }
  mounted() {
    if (walletStore.connected)
      this.vm.fetchUserInteract(walletStore.userInfo?.address);
    console.log("filteredMembers", this.vm.filteredMembers);
  }
}
</script>
<style lang="scss">
:root {
  --color-hover: "";
}
.member-card {
  max-width: 1500px;
}
.active:hover {
  background: white !important;
  border-radius: 12px;
  .gray3--text {
    color: white !important;
  }
}

.active2:hover {
  background: #2a2a2d !important;
  border-radius: 12px;
  .gray3--text {
    color: white !important;
  }
}
.member-page {
  .w-16 {
    width: 16px;
  }
}
.w-50 {
  width: 50%;
}
.w-100 {
  width: 100%;
}
.gap-20 {
  column-gap: 20px;
}
.row-gap-10 {
  row-gap: 10px;
}
.gray-12 {
  color: #77777e;
}
.onCursor {
  cursor: pointer;
}
</style>
