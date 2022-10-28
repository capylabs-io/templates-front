<template>
  <div class="mt-5">
    <div>Do you have an existing token for your DAO's community?</div>
    <div class="gray6--text text-sm">
      Holders of this token will be able to vote or edit your DAO.
    </div>
    <v-text-field
      class="input-field border-radius-8 elevation-0 mt-2"
      placeholder="ex: 0x0CDF9acd87E940837ff21BB40c9fd55F68bba059"
      color="primary"
      v-model="vm.walletAddress"
      :disabled="isSummary"
      dense
      solo
      outlined
    ></v-text-field>
  </div>
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