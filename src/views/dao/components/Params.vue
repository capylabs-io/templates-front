<template>
  <div class="pa-4 box-gray-12 rounded-lg params-page">
    <div class="d-flex">
      <div class="pa-0 cursor-pointer" @click="vm.changeParamsFlag()">
        <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
        <span class="text-capitalize blueJeans--text">Back</span>
      </div>
    </div>
    <div class="d-flex align-center mt-3">
      <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
      <span class="font-weight-bold text-md gray5--text">Axie DAO</span>
    </div>
    <div class="text-dp-xs white--text font-weight-bold">DAO Parameters</div>
    <v-row class="mt-3">
      <v-col cols="12" md="6" class="pa-4">
        <div class="pa-4 text-sm gray13 border-radius-12">
          <div class="font-weight-bold text-lg">Instruction</div>
          <div class="mt-4">
            <div class="gray6--text">PubKey</div>
            <div>8576jfkghdOPuer9041NBDKU02349</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Authority</div>
            <div>8576jfkghdOPuer9041NBDKU02349</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Owner</div>
            <div>8576jfkghdOPuer9041NBDKU02349</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Community Mint</div>
            <div>8576jfkghdOPuer9041NBDKU02349</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Council Mint</div>
            <div>8576jfkghdOPuer9041NBDKU02349</div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="pa-4">
        <div class="pa-4 text-sm gray13 border-radius-12">
          <div class="font-weight-bold text-lg">Config</div>
          <div class="mt-4">
            <div class="gray6--text">Config 1</div>
            <div>100%</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Config 1</div>
            <div>100%</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Config 1</div>
            <div>100%</div>
          </div>
          <div class="mt-4">
            <div class="gray6--text">Config 1</div>
            <div>100%</div>
          </div>
          <div class="d-flex mt-4 justify-center">
            <v-btn color="gray11 text-capitalize">Change config</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
@Observer
@Component({
  components: {},
})
export default class Params extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>
<style lang="scss">
.params-page {
  .w-16 {
    width: 16px;
  }
}
</style>