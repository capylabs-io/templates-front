<template>
  <div class="d-flex justify-space-between mx-auto pl-16">
    <div class="left d-flex flex-column">
      <div class="main-content d-flex flex-column">
        <h1 class="display-4">
          Lorem ipsum dolor sit amet, consecte adipiscing elit.
        </h1>
        <h2 class="font-weight-light mt-12 gray7--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit turpis
          quis auctor donec Sit turpis quis auctor donec sit enim, duis.
        </h2>
      </div>
      <div class="d-flex mt-16">
        <v-btn
          class="rounded-lg px-2 py-5 text-sm boder-majorelleBlue text-capitalize"
          color="majorelleBlue"
        >
          Connect Wallet
        </v-btn>
        <v-btn
          class="rounded-lg px-2 py-5 text-sm ml-5 boder-gray-10 text-capitalize"
          >Watch Tutorial</v-btn
        >
      </div>
    </div>
    <div class="right">
      <v-img src="@/assets/HomePage.png" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({})
export default class Home extends Vue {}
</script>
<style scoped>
.left {
  margin-top: 20%;
  width: 50%;
  height: 100%;
}
.right {
  width: 50%;
  height: 100%;
}
.boder-majorelleBlue {
  background-color: #3b3b3f !important;
  border: 1px solid #6a49e2 !important;
}
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
.main-content{
  width: 90%;
}
</style>
