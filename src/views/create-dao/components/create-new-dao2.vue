<template>
  <div class="mt-5">
    <div>
      <v-checkbox v-model="vm.isCouncilUse" :label="`Use Council`"></v-checkbox>
    </div>

    <v-slide-y-transition mode="out-in">
      <div v-show="vm.isCouncilUse">
        <div>
          <div>Council Token Mint Address</div>
          <v-text-field
            class="input-field border-radius-8 elevation-0 mt-2"
            v-model="vm.councilTokenAddress"
            color="primary"
            placeholder="ex: 0x0CDF9acd87E940837ff21BB40c9fd55F68bba059"
            dense
            solo
            outlined
            clearable
          ></v-text-field>
        </div>

        <div>
          <div>Approval quorum (%)</div>
          <v-text-field
            class="input-field border-radius-8 elevation-0 mt-2"
            v-model="vm.councilApprovalQuorum"
            color="primary"
            dense
            solo
            outlined
            clearable
          ></v-text-field>
        </div>
      </div>
    </v-slide-y-transition>
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
</style>