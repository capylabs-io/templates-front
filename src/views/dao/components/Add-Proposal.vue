<template>
  <v-card
    class="pa-4 border-radius-16"
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
      <div class="pa-0">
        <v-icon class="ml-4" :color="applicationStore.primaryColor"
          >mdi-launch</v-icon
        >
      </div>
    </div>
    <div class="mt-2 text-dp-xs white--text font-weight-bold">
      Add a proposal to SolenDAO
    </div>
    <div
      class="pa-4 text-capitalize border-radius-8 mt-3"
      :class="{ 'box-border-gray11': applicationStore.isDarkTheme }"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <div>Title</div>
      <div class="mt-2">
        <v-text-field
          class="input-field border-radius-8 elevation-0 h-36 max-width-428"
          v-model="vm.title"
          color="primary"
          placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
          :rules="[$rules.required]"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
      <div class="mt-3">Description</div>
      <div class="mt-2">
        <v-textarea
          class="
            min-h-80
            input-field
            border-radius-8
            elevation-0
            overflow-hidden
            max-width-428
          "
          color="primary"
          placeholder="eg: Introducte to new Features..."
          :value="vm.description"
          dense
          solo
          outlined
          no-resize
        ></v-textarea>
      </div>
      <div>Quorum</div>
      <div class="mt-2">
        <v-text-field
          class="input-field border-radius-8 elevation-0 h-36 max-width-428"
          v-model="vm.quorum"
          color="primary"
          placeholder="eg. 100"
          :rules="[$rules.required]"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
      <div class="mt-4 text-lg font-weight-bold">Transaction</div>
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
      >
        <div>Transaction {{ index + 1 }}</div>
        <div class="mt-2 d-flex justify-space-between">
          <v-select
            :items="vm.transactionList"
            label="Selection"
            solo
            hide-details
            class="max-width-428"
          ></v-select>
          <div
            :style="'color:' + applicationStore.primaryColor"
            class="d-flex align-seft-center cursor-pointer my-5"
          >
            <span class="ml-1">Inspect Transaction</span>
          </div>
          <div
            class="
              paradisePink--text
              d-flex
              align-seft-center
              cursor-pointer
              my-5
            "
            @click="vm.removeTransaction(index)"
          >
            <v-icon small color="paradisePink">mdi-delete</v-icon>
            <span class="ml-1">Remove</span>
          </div>
        </div>
        <div class="mt-3">Source account</div>
        <div class="mt-2">
          <v-text-field
            class="input-field border-radius-8 elevation-0 h-36 max-width-428"
            color="primary"
            placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
            dense
            v-model="transaction.source"
            solo
            outlined
            clearable
          ></v-text-field>
        </div>
        <div class="mt-3">Destination account</div>
        <div class="mt-2">
          <v-text-field
            class="input-field border-radius-8 elevation-0 h-36 max-width-428"
            color="primary"
            placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
            v-model="transaction.destination"
            dense
            solo
            outlined
            clearable
          ></v-text-field>
        </div>
      </div>
      <div
        class="d-flex justify-center cursor-pointer my-5"
        @click="vm.addTransaction()"
      >
        <v-icon small :color="applicationStore.primaryColor"
          >mdi-plus-circle-outline</v-icon
        >
        <span class="ml-1" :style="'color:' + applicationStore.primaryColor"
          >Add Transaction</span
        >
      </div>
      <div class="straight-line"></div>
      <div class="d-flex justify-center mt-4">
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
      <div class="mt-3 d-flex flex-row align-center justify-space-between">
        <div class="d-flex">
          <v-btn
            color="gray6"
            class="font-weight-bold gray11 text-capitalize px-4 mr-4"
            :disabled="!confirmCaptcha"
            >Preview instruction</v-btn
          >
          <v-btn
            color="gray6"
            class="font-weight-bold gray11 text-capitalize px-4"
            :disabled="!confirmCaptcha"
            >Save as Draft</v-btn
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

  confirmCaptcha = false;
  reset() {
    this.confirmCaptcha = false;
  }
  onCaptchaError(error) {
    snackController.error(error);
  }
  onCaptchaRender() {
    (this.$refs.recaptcha as any).reset();
  }
  onCaptchaVerify(response) {
    if (response) this.confirmCaptcha = true;
  }
  onCaptchaExpired() {
    (this.$refs.recaptcha as any).reset();
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