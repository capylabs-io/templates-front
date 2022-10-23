<template>
  <v-card class="pa-4 box-gray-12 rounded-lg text-sm font-weight-regular gray8--text" outlined>
    <div class="d-flex justify-space-between">
      <div class="font-weight-bold text-lg white--text">Your Account</div>
      <div class="d-flex cursor-pointer align-center"> 
        <span>View</span>
        <v-icon color="gray6 ml-6"> mdi-chevron-right</v-icon>
      </div>
    </div>
    <div class="vote-info pa-4 mt-3">
      <div>SLND Votes</div>
      <div class="font-weight-bold text-dp-xs white--text">100</div>
    </div>
    <v-row class="justify-center mt-3">
      <v-col cols="6 pr-2"><v-btn class="btn-gray-11 full-width">Deposit</v-btn></v-col>
      <v-col cols="6 pl-2"><v-btn class="btn-gray-11 full-width">Withdraw</v-btn></v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class YourAccount extends Vue {}
</script>
<style scoped>
.vote-info {
  background: #1E1E20;
  opacity: 0.8;
  border: 1px solid #3B3B3F !important;
  border-radius: 8px;
}
</style>