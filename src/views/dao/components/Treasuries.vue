<template>
  <v-card
    class="pa-4 box-gray-12 rounded-lg text-sm font-weight-regular gray8--text"
    outlined
  >
    <div class="d-flex justify-space-between">
      <div class="font-weight-bold text-lg white--text">Treasuries</div>
      <div class="d-flex cursor-pointer align-center" @click="vm.changeShowTreasuries()">
        <span>View</span>
        <v-icon color="gray6 ml-6"> mdi-chevron-right</v-icon>
      </div>
    </div>
    <div class="treasury-info pa-4 mt-3">
      <div>Treasury Balance</div>
      <div class="font-weight-bold text-dp-xs white--text">$0</div>
    </div>
    <div class="pa-4 border border-radius-8 mt-4">
      <div class="d-flex pa-4">
        <div>
          <div class="prime7 pa-1 d-flex justify-center align-center rounded-circle mr-2">
            <img src="@/assets/axie-icon.png" />
          </div>
        </div>
        <div class="gray3--text">
          <div class="font-weight-bold">3Q3ph8KiL...RGvG8</div>
          <div class="text-overline-1">Votes Cast: 3</div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
@Observer
@Component({
  components: {},
})
export default class Treasuries extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>
<style scoped>
.treasury-info {
  background: #1e1e20;
  border: 1px solid #3b3b3f !important;
  border-radius: 8px;
}
.border {
  border: 1px solid #3b3b3f !important;
}
</style>