<template>
  <div class="mt-5">
    <div>
      <div>Name</div>
      <v-text-field
        class="input-field border-radius-8 elevation-0 mt-2"
        v-model="vm.daoName"
        color="primary"
        placeholder="Name of your DAO"
        dense
        solo
        outlined
        clearable
      ></v-text-field>
    </div>

    <div>
      <div>Min Community token to create governance</div>
      <v-text-field
        class="input-field border-radius-8 elevation-0 mt-2"
        type="number"
        v-model="vm.minAmountToCreate"
        color="primary"
        dense
        solo
        outlined
      ></v-text-field>
    </div>

    <div>
      <div>Community mint supply factor</div>
      <v-text-field
        class="input-field border-radius-8 elevation-0 mt-2"
        type="number"
        v-model="vm.communityMintFactor"
        color="primary"
        dense
        solo
        outlined
      ></v-text-field>
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
</style>