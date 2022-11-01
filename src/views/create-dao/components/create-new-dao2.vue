<template>
  <v-form ref="create-new-dao2" class="mt-5" v-model="vm.createNewDaoForm2">
    <div>
      <v-checkbox
        v-model="vm.isCouncilUse"
        :label="`Use Council`"
        :disabled="isSummary"
      ></v-checkbox>
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
            :disabled="isSummary"
            :rules="[$rules.required, $rules.validWalletAddress]"
            dense
            solo
            outlined
            clearable
          ></v-text-field>
        </div>

        <div>
          <div>Approval quorum (%)</div>
          <v-text-field
            type="number"
            class="input-field border-radius-8 elevation-0 mt-2"
            v-model="vm.councilApprovalQuorum"
            color="primary"
            :disabled="isSummary"
            :rules="[$rules.required, $rules.max(100), $rules.min(0)]"
            dense
            solo
            outlined
            clearable
          ></v-text-field>
        </div>
      </div>
    </v-slide-y-transition>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Component({
  components: {},
})
export default class ChooseToken extends Vue {
  @Inject() vm!: CreateDaoViewModel;

  @Prop({ default: false }) isSummary!: boolean;
}
</script>

<style scoped>
</style>