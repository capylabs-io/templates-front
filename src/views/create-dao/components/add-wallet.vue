<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <div v-if="!isSummary">
      <v-form ref="add-team-wallet" class="mt-5">
        <div class="d-flex align-center">
          <div>{{ title }}</div>
          <div
            class="count-wallets font-weight-bold border-radius-16 px-2 ml-2"
          >
            {{ vm.memberCount }}
          </div>
        </div>
        <div class="gray6--text mt-1">
          Add member's wallet addresses, separated by a comma. You can add more
          later in DAO’s setting.
        </div>
        <div class="mt-3 d-flex align-center">
          <v-icon>mdi-account-circle-outline</v-icon>
          <div class="font-weight-medium ml-2">
            You: {{ walletStore.account }}
          </div>
        </div>

        <div class="mt-3">
          <v-textarea
            class="input-field border-radius-8 elevation-0 overflow-hidden"
            color="primary"
            placeholder="ex: 0x20C07DaDc0AB5219246BCac518b56F4212380538"
            @input="vm.changeMemberString($event)"
            :value="vm.membersString"
            dense
            solo
            outlined
            no-resize
          ></v-textarea>
        </div>
      </v-form>
    </div>

    <div v-else>
      <div class="d-flex align-center justify-space-between">
        <div>{{ title }}</div>
        <v-btn
          color="blueJeans"
          class="text-none btn-text px-0"
          @click="showMemberDetail = !showMemberDetail"
          text
          >View Details</v-btn
        >
      </div>
      <div v-show="!showMemberDetail">
        <v-text-field
          class="input-field border-radius-8 elevation-0 mt-1"
          type="number"
          v-model="vm.memberCount"
          color="primary"
          :disabled="isSummary"
          hide-details
          dense
          solo
          outlined
        ></v-text-field>
      </div>
      <v-slide-y-transition mode="out-in">
        <div v-show="showMemberDetail">
          <div class="table-border border-radius-8 overflow-hidden mt-4">
            <v-data-table
              :items="vm.pageMembers"
              :headers="headers"
              :items-per-page="vm.memberPerPage"
              hide-default-header
              hide-default-footer
            >
              <template v-slot:item.isYou="{ item }">
                <div class="d-flex align-center" v-if="item.isYou">
                  <v-icon>mdi-account-circle-outline</v-icon>
                  <div class="font-weight-medium ml-2">You</div>
                </div>
              </template>
            </v-data-table>
          </div>
          <v-pagination
            class="mt-4"
            color="primary"
            v-model="vm.memberPage"
            :length="vm.totalMemberPage"
            circle
            v-if="vm.members && vm.members.length > 0"
          >
          </v-pagination>
        </div>
      </v-slide-y-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";
import { Vue, Component, Inject, Prop } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Observer
@Component({
  components: {},
})
export default class AddTeamWallet extends Vue {
  @Inject() vm!: CreateDaoViewModel;

  @Prop({ default: "Invite members" }) title!: string;
  @Prop({ default: false }) isSummary!: boolean;

  walletStore = walletStore;
  headers = [
    {
      text: "Wallet",
      value: "wallet",
    },
    {
      text: "Is You",
      value: "isYou",
    },
  ];
  showMemberDetail = false;
}
</script>

<style scoped>
.count-wallets {
  background: var(--v-primary-base);
}
.table-border {
  border: 1px solid var(--v-gray11-base);
}
</style>