<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="vm.isOpenAddProposal"
    width="576px"
    persistent
  >
    <v-card class="border-radius-16 box-gray-12">
      <v-card-title class="dialog-title">
        <div class="ma-auto">Add a proposal to SolenDAO</div>
        <v-icon
          class="mr-1"
          @click="vm.changeAddProposalDialog()"
          color="blueJeans"
          >mdi-close</v-icon
        >
      </v-card-title>
      <v-card-text class="mt-3 text-sm font-weight-regular white--text">
        <div>Title</div>
        <div class="mt-2">
          <input
            type="text"
            name="proposalTitle"
            placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
            class="h-36 full-width box-gray-13 pl-4 white--text"
          />
        </div>
        <div class="mt-2">Description</div>
        <div class="mt-2">
          <textarea
            name="proposalDes"
            auto-grow
            class="min-h-80 full-width box-gray-13 pl-4 white--text"
            placeholder="eg: Introducte to new Features..."
          ></textarea>
        </div>
        <div class="d-flex justify-space-between mt-6">
          <div class="text-lg font-weight-bold">Instruction</div>
          <div class="blueJeans--text d-flex align-center cursor-pointer">
            <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
            <span class="ml-1">Add Instruction</span>
          </div>
        </div>
        <div class="mt-3">Instruction 1</div>
        <div class="mt-2">
          <v-select
            :items="vm.instructionList"
            label="Selection"
            solo
          ></v-select>
        </div>
        <div>Governance</div>
        <div class="mt-2">
          <v-select
            :items="vm.instructionList"
            label="Selection"
            solo
          ></v-select>
        </div>
        <div>SPL Token Mint</div>
        <div class="mt-2">
          <v-select
            :items="vm.instructionList"
            label="Selection"
            solo
          ></v-select>
        </div>
      </v-card-text>
      <v-card-actions
        class="d-flex flex-row align-center px-6 pb-6 justify-space-between"
      >
        <div class="d-flex">
          <v-btn color="gray60" class="btn-gray-11 px-4 mr-4"
            >Preview instruction</v-btn
          >
          <v-btn color="gray60" class="btn-gray-11 px-4"
            >Save as Draft</v-btn
          >
        </div>
        <v-btn
          color="majorelleBlue"
          class="
            white--text
            font-weight-bold
            text-capitalize
            rounded-lg
            px-4
          "
          >Add proposal</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Observer
@Component({
  components: {},
})
export default class AddProposal extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>

<style scoped>
.border {
  border: 1px solid #565a61;
}
</style>
