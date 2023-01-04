<template>
  <div class="pa-4 ma-5 box-gray-12 rounded-lg member-page">
    <div class="d-flex">
      <div class="pa-0 cursor-pointer" text @click="vm.changeMemberFlag()">
        <v-icon
          :color="applicationStore.primaryColor"
          small
          @click="vm.setpickMembers(false), vm.setpickDao(true)"
        >
          mdi-chevron-left</v-icon
        >
        <span
          @click="vm.setpickMembers(false), vm.setpickDao(true)"
          class="text-capitalize onCursor"
          :style="'color:' + applicationStore.primaryColor + ' !important'"
          >Back</span
        >
      </div>
    </div>
    <div class="d-flex align-center mt-3">
      <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
      <span class="font-weight-bold text-md gray5--text">Axie DAO</span>
    </div>
    <div class="text-dp-xs white--text font-weight-bold">Member</div>
    <v-row class="pa-2">
      <v-col cols="12" md="4" class="pa-2 text-sm">
        <div class="gray13 border-radius-12 pa-4">
          <div class="d-flex justify-space-between">
            <div class="pa-0">2 members</div>
            <div class="blueJeans--text d-flex justify-center cursor-pointer">
              <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
              <span class="ml-1">New Member</span>
            </div>
          </div>
          <div
            class="overflow-y-auto mt-3"
            v-for="member in vm.daoSetting.members"
            :key="member.wallet"
          >
            <div class="d-flex pa-4 active">
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

      <v-col cols="12" md="8" class="pa-2">
        <div class="gray13 border-radius-12 pa-4 overflow-y-auto">
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
              <div class="font-weight-bold text-md">Votes</div>
              <div class="font-weight-bold text-dp-xs pb-10">300</div>
            </div>
            <div
              class="d-flex flex-column justify-space-between pa-4 cursor-pointer mt-3 rounded-lg w-50 row-gap-10"
              :style="'background: #2A2A2D'"
            >
              <div class="font-weight-bold text-md">Votes</div>
              <div class="font-weight-bold text-dp-xs">3</div>
              <div class="d-flex gap-20">
                <div class="d-flex align-center">
                  <v-icon color="success" class="mr-2 align-center"
                    >mdi-thumb-up</v-icon
                  >
                  <div>Yes: 2</div>
                </div>
                <div class="d-flex align-center">
                  <v-icon color="error" class="mr-2 align-center"
                    >mdi-thumb-down</v-icon
                  >
                  <div>No: 1</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pa-0 gray-12">3 recent votes</div>
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
        </div>
      </v-col>
    </v-row>
  </div>
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
}
</script>
<style lang="scss">
.member-page {
  .w-16 {
    width: 16px;
  }
  .active {
    background: #3b3b3f !important;
    border-radius: 12px;
    .gray3--text {
      color: white !important;
    }
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
