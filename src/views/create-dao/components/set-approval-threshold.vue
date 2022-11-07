<template>
  <div class="my-5">
    <div v-if="!isSummary">
      <div class="d-flex justify-space-between text-sm">
        <div>0%</div>
        <div>100%</div>
      </div>
      <v-slider
        v-model="vm.approvalThreshold"
        color="primary"
        track-color="grey"
        class="mt-0"
        always-dirty
        min="0"
        max="100"
        hide-details
        :disabled="isSummary"
      >
      </v-slider>
      <div class="d-flex align-center justify-space-between">
        <div class="text-sm">
          Set the percentage to determine votes needed to pass a proposal
        </div>
        <div class="threshold-box text-sm font-weight-bold px-2 py-1">
          {{ vm.approvalThreshold }}%
        </div>
      </div>
    </div>
    <div v-else>
      <div>Approval Threshold</div>
      <v-text-field
        class="input-field border-radius-8 elevation-0 mt-2"
        :value="vm.approvalThreshold + '%'"
        color="primary"
        :disabled="isSummary"
        dense
        solo
        outlined
      ></v-text-field>
    </div>
  </div>
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

<style scoped>
.threshold-box {
  background: var(--v-gray11-base);
  border-radius: 4px;
}
</style>