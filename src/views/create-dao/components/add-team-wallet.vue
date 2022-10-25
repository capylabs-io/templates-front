<template>
  <div class="mt-5">
    <div class="d-flex align-center">
      <div>Add Team Wallets</div>
      <div class="count-wallets font-weight-bold border-radius-16 px-2 ml-2">
        {{ vm.memberCount }}
      </div>
    </div>
    <div class="gray6--text mt-1">
      Add Solana wallet addresses, separated by a comma. You can add more later
      in DAO’s setting.
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Component
export default class ChooseToken extends Vue {
  @Inject() vm!: CreateDaoViewModel;
}
</script>

<style scoped>
.count-wallets {
  background: var(--v-primary-base);
}
</style>