<template>
  <v-form v-model="vm.setupWalletForm" class="mt-5">
    <div>Your Wallet Name</div>
    <div class="gray6--text text-sm">
      It’s best to choose a descriptive and memorable name.
    </div>
    <v-text-field
      class="input-field border-radius-8 elevation-0 mt-2"
      placeholder="ex: 0x0CDF9acd87E940837ff21BB40c9fd55F68bba059"
      color="primary"
      v-model="vm.daoName"
      :disabled="isSummary"
      :rules="[$rules.required]"
      dense
      solo
      outlined
    ></v-text-field>
  </v-form>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Vue, Component, Inject, Prop } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Observer
@Component({
  components: {},
})
export default class ChooseToken extends Vue {
  @Inject() vm!: CreateDaoViewModel;

  @Prop({ default: false }) isSummary!: boolean;
}
</script>