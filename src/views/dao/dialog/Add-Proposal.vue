<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="vm.isOpenAddProposal"
    width="500px"
    persistent
  >
    <v-card class="border-radius-16 box-gray-12">
      <v-card-title class="dialog-title">
        <div class="ma-auto">Add a proposal to SolenDAO</div>
        <v-icon
          class="mr-1"
          @click="vm.changeAddProposalDialog()"
          >mdi-close</v-icon
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <div class="my-4 text-subtitle-2 text-center white--text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis eos
          ab cum soluta harum, delectus beatae praesentium repellat fugit
          veritatis cupiditate atque laboriosam quo in adipisci fugiat ipsum
          expedita consequatur.
        </div>
      </v-card-text>
      <v-card-actions
        class="d-flex flex-row align-center px-6 pb-6 justify-center"
      >
        <v-btn
          color="gray60"
          class="
            btn-gray-11
            px-10
            mx-3
          "
          >Save as Draft</v-btn
        >
        <v-btn
          color="majorelleBlue"
          class="
            white--text
            font-weight-bold
            text-capitalize
            rounded-lg
            px-10
            mx-3
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
