<template>
  <v-card
    class="pa-6 border-radius-16"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important;'"
    :outlined="applicationStore.isDarkTheme"
    elevation="0"
  >
    <div class="d-inline-flex justify-space-between full-width">
      <div
        class="pa-0 cursor-pointer"
        text
        @click="vm.changeAddProposalDialog()"
      >
        <v-icon small :color="applicationStore.primaryColor">
          mdi-chevron-left</v-icon
        >
        <span
          class="text-capitalize"
          :style="'color:' + applicationStore.primaryColor"
          >Back</span
        >
      </div>
    </div>
    <div class="mt-2 text-dp-xs white--text font-weight-bold">
      Add a proposal to SolenDAO
    </div>

    <div class="mt-2">
      <div class="text-sm">Title</div>
      <div class="mt-2">
        <v-text-field
          class="input-field border-radius-8 elevation-0"
          v-model="vm.title"
          color="primary"
          placeholder="eg. Create a new NFT collection for Stakeholders"
          :rules="[$rules.required]"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
    </div>

    <div class="mt-n2">
      <div class="text-sm">Description</div>
      <div class="mt-2">
        <v-textarea
          class="input-field border-radius-8 elevation-0 overflow-hidden"
          color="primary"
          placeholder="eg: Introducte to new Features..."
          :value="vm.description"
          dense
          solo
          outlined
          no-resize
        ></v-textarea>
      </div>
    </div>

    <div class="mt-n2">
      <div class="text-sm">Quorum</div>
      <div class="mt-2">
        <!-- <v-text-field
          class="input-field border-radius-8 elevation-0 h-36 max-width-428"
          v-model="vm.quorum"
          color="primary"
          placeholder="eg. 100"
          :rules="[$rules.required]"
          dense
          solo
          outlined
          clearable
        ></v-text-field> -->
        <div class="d-flex justify-space-between text-sm font-weight-bold">
          <div>0%</div>
          <div>100%</div>
        </div>
        <v-slider
          v-model="vm.quorum"
          color="primary"
          track-color="grey"
          class="mt-0"
          always-dirty
          min="0"
          max="100"
          :thumb-size="28"
          thumb-label="always"
          hide-details
        >
          <template v-slot:thumb-label="{ value }"> {{ value }}% </template>
        </v-slider>
      </div>
    </div>

    <div class="mt-6 text-lg font-weight-bold">Transaction</div>
    <div
      class="mt-2 pa-4 border-radius-16"
      :class="
        applicationStore.isDarkTheme
          ? 'box-border-gray11 white--text'
          : 'black--text'
      "
      :style="'background:' + applicationStore.cardColor + ' !important;'"
      :outlined="applicationStore.isDarkTheme"
      v-for="(transaction, index) in vm.transactions"
      :key="index"
      @click="onExpandTransactionDetail(index)"
    >
      <div class="d-flex align-center justify-space-between">
        <div>Transaction {{ index + 1 }}</div>
        <v-btn
          class="text-none btn-text px-0"
          color="error"
          :disabled="vm.transactions && vm.transactions.length == 1"
          @click.stop="onRemoveTransaction(index)"
          text
        >
          <v-icon class="mr-2" small>mdi-trash-can</v-icon>
          Remove
        </v-btn>
      </div>
      <div class="mt-2 d-flex justify-space-between">
        <v-select
          :items="vm.transactionList"
          class="border-radius-8"
          label="Transaction Type"
          dense
          solo
          outlined
          hide-details
        ></v-select>
      </div>
      <div v-show="index == currentIndex">
        <div class="mt-4">
          <div>Source account</div>
          <div class="mt-2">
            <v-text-field
              class="input-field border-radius-8 elevation-0"
              color="primary"
              placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
              dense
              v-model="transaction.source"
              :rules="[$rules.validWalletAddress, $rules.required]"
              solo
              outlined
              clearable
            ></v-text-field>
          </div>
        </div>
        <div class="mt-n2">
          <div>Destination account</div>
          <div class="mt-2">
            <v-text-field
              class="input-field border-radius-8 elevation-0"
              color="primary"
              placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
              v-model="transaction.destination"
              :rules="[$rules.validWalletAddress, $rules.required]"
              dense
              solo
              outlined
              clearable
            ></v-text-field>
          </div>
        </div>
        <div class="mt-n2">
          <div>Amount</div>
          <div class="mt-2">
            <v-text-field
              class="input-field border-radius-8 elevation-0"
              color="primary"
              placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
              v-model="transaction.amount"
              :rules="[$rules.numberOnly, $rules.required]"
              dense
              solo
              outlined
              clearable
            ></v-text-field>
          </div>
        </div>
      </div>
    </div>

    <div
      class="d-flex justify-center cursor-pointer my-5"
      @click="onAddTransaction()"
    >
      <v-icon small :color="applicationStore.primaryColor"
        >mdi-plus-circle-outline</v-icon
      >
      <span class="ml-1" :style="'color:' + applicationStore.primaryColor"
        >Add Transaction</span
      >
    </div>
    <div class="straight-line"></div>
    <div class="d-flex justify-center my-4">
      <VueRecaptcha
        sitekey="6LeHpK8jAAAAAOOfNAcZI-ayzWxQ5R1Dzf1swXjB"
        :loadRecaptchaScript="true"
        @render="onCaptchaRender"
        @verify="onCaptchaVerify"
        @expired="onCaptchaExpired"
        ref="recaptcha"
      >
      </VueRecaptcha>
    </div>

    <div class="straight-line"></div>
    <div class="mt-4 d-flex flex-row align-center justify-space-between">
      <div class="d-flex">
        <v-btn
          color="gray6"
          class="font-weight-bold gray11 rounded-lg text-capitalize px-4"
          @click="vm.changeAddProposalDialog()"
          >Cancel</v-btn
        >
      </div>
      <v-btn
        :color="applicationStore.primaryColor"
        class="font-weight-bold text-capitalize rounded-lg px-4"
        @click="vm.createApplication()"
        :disabled="!confirmCaptcha"
        >Add proposal</v-btn
      >
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { observable } from "mobx";
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";
import { VueRecaptcha } from "vue-recaptcha";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
@Observer
@Component({
  components: { VueRecaptcha },
})
export default class AddProposal extends Vue {
  @observable checkbox;
  @observable isFilter = false;
  @Inject() vm!: DaoViewModel;
  applicationStore = applicationStore;
  currentIndex = 0;

  confirmCaptcha = false;
  reset() {
    this.confirmCaptcha = false;
  }
  onCaptchaError(error) {
    snackController.error(error);
  }
  onCaptchaRender() {
    (this.$refs.recaptcha as any).reset();
    this.confirmCaptcha = false;
  }
  onCaptchaVerify(response) {
    if (response) this.confirmCaptcha = true;
  }
  onCaptchaExpired() {
    (this.$refs.recaptcha as any).reset();
    this.confirmCaptcha = false;
  }
  onExpandTransactionDetail(index: number) {
    this.currentIndex = index;
  }
  onAddTransaction() {
    this.vm.addTransaction();
    this.currentIndex = this.vm.transactions.length - 1;
  }
  onRemoveTransaction(index: number) {
    this.vm.removeTransaction(index);
    if (this.currentIndex == index) this.currentIndex = index - 1;
    else this.currentIndex -= 1;
  }
}
</script>
<style scoped>
.transaction-box {
  border: 1px solid #4f4f54;
  border-radius: 12px;
}
.straight-line {
  width: 100%;
  height: 1px;
  /* Grey/11 */
  background: #3b3b3f;
}
.max-width-428 {
  max-width: 428px;
}
</style>