<template>
  <div>
    <div v-if="!isSummary">
      <v-form ref="add-team-wallet" class="mt-5">
        <div class="d-flex align-center">
          <div>Add Team Wallets</div>
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
          <v-icon large>mdi-account-circle-outline</v-icon>
          <div class="font-weight-medium ml-2">
            0x20C07DaDc0AB5219246BCac518b56F4212380538
          </div>
        </div>

        <div class="mt-3">
          <v-textarea
            class="input-field border-radius-8 elevation-0 overflow-hidden"
            v-model="vm.tokenAddress"
            color="primary"
            placeholder="ex: 0x20C07DaDc0AB5219246BCac518b56F4212380538"
            dense
            solo
            outlined
            no-resize
          ></v-textarea>
        </div>
      </v-form>
    </div>

    <div class="mb-5" v-else>
      <div class="d-flex align-center">
        <div>Add Team Wallets</div>
        <div class="count-wallets font-weight-bold border-radius-16 px-2 ml-2">
          {{ vm.memberCount }}
        </div>
      </div>
      <v-data-table
        class="mt-3"
        :items="vm.members"
        :headers="headers"
        hide-default-header
        hide-default-footer
      >
      </v-data-table>
      <v-pagination
        class="mt-2"
        v-model="vm.page"
        :length="vm.totalPage"
        v-if="vm.members && vm.members.length > 0"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Component({
  components: {},
})
export default class AddTeamWallet extends Vue {
  @Inject() vm!: CreateDaoViewModel;

  @Prop({ default: false }) isSummary!: boolean;

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
}
</script>

<style scoped>
.count-wallets {
  background: var(--v-primary-base);
}
</style>