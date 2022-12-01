<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="vm.isDepositQRDialog"
    width="328px"
    persistent
  >
    <v-card class="border-radius-16 box-gray-12">
      <v-card-title class="dialog-title">
        <div class="ma-auto">Deposit SOL</div>
        <v-icon
          class="mr-1"
          @click="vm.changeDepositQRDialog()"
          color="blueJeans"
          >mdi-close</v-icon
        >
      </v-card-title>
      <v-card-text class="pa-4">
        <img class="full-width" src="@/assets/Deposit-QR.png" />
        <div class="text-center gray5--text text-xs">3QpKiL...RGvG <v-icon color="gray5" x-small>mdi-content-copy</v-icon></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Observer
@Component({
  components: {},
})
export default class DepositQRDialog extends Vue {
  @Prop({ default: false }) isVoteYes!: boolean;
  @Inject() vm!: DaoViewModel;
}
</script>

<style scoped>
.border {
  border: 1px solid #565a61;
}
</style>
