<template>
  <div class="pa-4 box-gray-12 rounded-lg">
    <div class="d-flex justify-space-between">
      <div
        class="pa-0 cursor-pointer"
        text
        @click="vm.changeAddProposalDialog()"
      >
        <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
        <span class="text-capitalize blueJeans--text">Back</span>
      </div>
      <div class="pa-0">
        <v-icon class="ml-4" color="blueJeans">mdi-launch</v-icon>
      </div>
    </div>
    <div class="text-dp-xs white--text font-weight-bold">
      Add a proposal to SolenDAO
    </div>
    <div class="mt-3 text-sm font-weight-regular white--text">
      <div class="mt-3">Title</div>
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
      <div class="mt-3">Quorum</div>
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
      <div class="text-lg font-weight-bold">Transaction</div>
      <div
        class="mt-3 pa-4 transaction-box"
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
          <div class="blueJeans--text d-flex align-seft-center cursor-pointer my-5">
        <span class="ml-1">Inspect Transaction</span>
      </div>
      <div class="paradisePink--text d-flex align-seft-center cursor-pointer my-5" @click="vm.removeTransaction(index)">
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
      <div class="blueJeans--text d-flex justify-center cursor-pointer my-5" @click="vm.addTransaction()">
        <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
        <span class="ml-1">Add Transaction</span>
      </div>
      <div class="straight-line"></div>
      <div class="mt-3 d-flex flex-row align-center justify-space-between">
        <div class="d-flex">
          <v-btn color="gray60" class="btn-gray-11 px-4 mr-4"
            >Preview instruction</v-btn
          >
          <v-btn color="gray60" class="btn-gray-11 px-4">Save as Draft</v-btn>
        </div>
        <v-btn
          color="majorelleBlue"
          class="white--text font-weight-bold text-capitalize rounded-lg px-4"
          @click="vm.createApplication()"
          >Add proposal</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { observable } from "mobx";
import { DaoViewModel } from "../models/dao-viewmodels";
@Observer
@Component({
  components: {},
})
export default class AddProposal extends Vue {
  @observable checkbox;
  @observable isFilter = false;
  @Inject() vm!: DaoViewModel;
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