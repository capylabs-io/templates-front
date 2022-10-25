<template>
  <div>
    <div>
      <div>Do you have an existing token for your DAO's community?</div>
      <div class="gray6--text">
        Holders of this tokne will be able to vote or edit your DAO.
      </div>
      <v-radio-group class="mt-3" v-model="vm.isCreateNewToken" mandatory>
        <v-radio :label="`No, let's create one`" :value="true"></v-radio>
        <v-radio :label="`Yes`" :value="false"></v-radio>
      </v-radio-group>
    </div>
    <v-slide-y-transition mode="out-in">
      <div v-show="!vm.isCreateNewToken">
        <div>Do you have an existing token for your DAO's community?</div>
        <div class="gray6--text">
          Holders of this tokne will be able to vote or edit your DAO.
        </div>
        <div class="mt-2">
          <v-text-field
            class="input-field border-radius-8 elevation-0"
            v-model="vm.tokenAddress"
            color="primary"
            placeholder="ex: 0x0CDF9acd87E940837ff21BB40c9fd55F68bba059"
            dense
            solo
            outlined
            clearable
          ></v-text-field>
        </div>
      </div>
    </v-slide-y-transition>
    <div
      class="
        btn-advance
        border-radius-8
        d-flex
        justify-center
        pa-2
        mb-6
        cursor-pointer
      "
      @click="vm.isChooseTokenAdvance = !vm.isChooseTokenAdvance"
    >
      <div class="mr-1">Advance Option</div>
      <v-icon v-if="vm.isChooseTokenAdvance">mdi-chevron-up</v-icon>
      <v-icon v-else>mdi-chevron-down</v-icon>
    </div>
    <v-slide-y-transition mode="out-in">
      <div v-show="vm.isChooseTokenAdvance">
        <div>Do you have an existing token for your DAO's community?</div>
        <div class="gray6--text">
          This value determines the max voter weight used to calculate voting
          thresholds.
        </div>
        <v-radio-group class="mt-3" v-model="vm.isAbsoluteOption" mandatory>
          <v-radio :label="`Supply Fraction`" :value="false"></v-radio>
          <v-radio :label="`Absolute`" :value="true"></v-radio>
        </v-radio-group>
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
.btn-advance {
  border: var(--v-primary-base) 1px solid;
  background: var(--v-gray11-base);
  width: 174px;
}
</style>