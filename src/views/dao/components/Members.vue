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
    <div
      class="d-flex cursor-pointer"
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
    </div>

    <div>
      <div class="d-flex align-center mt-3">
        <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
        <span class="font-weight-bold text-md gray5--text"> Axie DAO</span>
      </div>
      <div class="text-dp-xs white--text font-weight-bold mt-1">Members</div>
    </div>
    <v-row class="mt-1">
      <v-col cols="12" md="6" class="text-sm">
        <div
          class="border-radius-16 pa-4 full-height"
          :class="{
            'box-border-gray11': applicationStore.isDarkTheme,
          }"
          :style="'background:' + applicationStore.accentColor + ' !important'"
        >
          <div class="d-flex justify-space-between">
            <div class="">
              {{
                vm.daoSetting?.members === undefined
                  ? "0"
                  : vm.daoSetting?.members?.length
              }}
              members
            </div>
            <div class="blueJeans--text d-flex justify-center cursor-pointer">
              <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
              <span class="ml-1">New Member</span>
            </div>
          </div>
          <div
            class="mt-3"
            v-for="member in vm.daoSetting.members"
            :key="member.wallet"
          >
            <div
              class="d-flex pa-4 active"
              @click="getUsersVote(member.wallet)"
            >
              <div>
                <div class="prime7 pa-1 rounded-circle mr-2">
                  <v-icon color="prime2">mdi-account-circle</v-icon>
                </div>
              </div>
              <div class="gray3--text">
                <div class="font-weight-bold">{{ member.wallet }}</div>
                <div class="text-overline-1">Votes Cast: 3</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="text-sm">
        <div
          class="border-radius-16 pa-4 full-height"
          :class="{ 'box-border-gray11': applicationStore.isDarkTheme }"
          :style="'background:' + applicationStore.accentColor + ' !important'"
        >
          <div class="d-flex justify-space-between">
            <div class="pa-0">3Q3ph8KiL...RGvG8</div>
            <div
              class="blueJeans--text d-flex justify-center cursor-pointer gray6--text"
            >
              <span class="ml-1">Explore</span>
              <v-icon small color="blueJeans">mdi-launch</v-icon>
            </div>
          </div>
          <div class="d-flex gap-20">
            <div
              class="d-flex flex-column justify-space-between pa-4 cursor-pointer mt-3 rounded-lg w-50"
              :style="'background: #2A2A2D'"
            >
              <!-- sum of votes amount -->
              <div class="font-weight-bold text-md">Votes (amount)</div>
              <div class="font-weight-bold text-dp-xs pb-10">
                {{ vm.votesAmount }}
              </div>
            </div>
            <div
              class="d-flex flex-column justify-space-betwe en pa-4 cursor-pointer mt-3 rounded-lg w-50 row-gap-10"
              :style="'background: #2A2A2D'"
            >
              <div class="font-weight-bold text-md">Votes Cast</div>
              <div class="font-weight-bold text-dp-xs">
                {{ vm.numberOfVotes }}
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
            </div>
          </div>
          <div class="pa-0 gray-12">{{ vm.numberOfVotes }} recent votes</div>
          <div
            class="d-flex justify-space-between pa-4 cursor-pointer mt-3 rounded-lg w-100"
            :style="'background: #2A2A2D'"
          >
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
                    SLND3: Introduce Account Borrow Limit
                  </div>
                </template>
                <span>SLND3: Introduce Account Borrow Limit</span>
              </v-tooltip>
              <div>Succeeded 3 months ago</div>
            </div>
            <div class="d-flex align-center ml-4">
              <MemberStatus :color="'#3B3B3F'" />
              <v-icon class="ml-4" color="gray6"> mdi-chevron-right</v-icon>
            </div>
          </div>

          <div
            class="d-flex flex-column justify-space-between pa-4 cursor-pointer mt-3 rounded-lg w-100"
            :style="'background: #2A2A2D'"
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
                      SLND3: Introduce Account Borrow Limit
                    </div>
                  </template>
                  <span>SLND3: Introduce Account Borrow Limit</span>
                </v-tooltip>
                <div>Succeeded 3 months ago</div>
              </div>
              <div class="d-flex align-center ml-4">
                <MemberStatus :color="'#3B3B3F'" />
                <v-icon class="ml-4" color="gray6"> mdi-chevron-right</v-icon>
              </div>
            </div>
            <div
              class="d-flex gap-20 pa-4 rounded-lg mt-2"
              :style="'background:' + applicationStore.accentColor"
            >
              <div>
                <v-icon class="ml-4" color="gray6"> mdi-chat-outline </v-icon>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur. Condimentum eu ornare
                odio neque viverra mattis facilisi nisi urna.Condimentum eu
                ornare odio neque viverra mattis facilisi nisi urna.
              </div>
            </div>
            <div
              class="d-flex gap-20 pa-4 rounded-lg mt-2"
              :style="'background:' + applicationStore.accentColor"
            >
              <div>
                <v-icon class="ml-4" color="gray6"> mdi-chat-outline </v-icon>
              </div>
              <div>What are thoseeeeee</div>
            </div>
          </div>
          <div
            class="d-flex flex-column pa-4 cursor-pointer mt-3 rounded-lg w-100"
            :style="'background: #2A2A2D'"
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
                      SLND3: Introduce Account Borrow Limit
                    </div>
                  </template>
                  <span>SLND3: Introduce Account Borrow Limit</span>
                </v-tooltip>
                <div>Succeeded 3 months ago</div>
              </div>
              <div class="d-flex align-center ml-4">
                <MemberStatus :color="'#3B3B3F'" />
                <v-icon class="ml-4" color="gray6"> mdi-chevron-right</v-icon>
              </div>
            </div>
            <div
              class="d-flex gap-20 pa-4 rounded-lg mt-2"
              :style="'background:' + applicationStore.accentColor"
            >
              <div>
                <v-icon class="ml-4" color="gray6"> mdi-chat-outline </v-icon>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur. Condimentum eu ornare
                odio neque viverra mattis facilisi nisi urna.
              </div>
            </div>
          </div>
        </div></v-col
      >
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";
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

  getUsersVote(address) {
    this.vm.fetchUserVotes(address);
  }
}
</script>
<style lang="scss">
.member-card {
  max-width: 1500px;
}
.active:hover {
  background: #3b3b3f !important;
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
