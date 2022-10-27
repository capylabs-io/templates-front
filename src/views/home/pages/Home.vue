<template>
  <div class="main d-flex justify-space-between mx-auto max-height">
    <div class="left d-flex flex-column pl-16">
      <div class="content d-flex flex-column">
        <h1 class="text-dp-xxl">
          Lorem ipsum dolor sit amet, consecte adipiscing elit.
        </h1>
        <h2 class="font-weight-light mt-12 gray7--text text-dp-xs">
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
      <v-img aspect-ratio="1" src="@/assets/HomePage.png" />
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
  margin-top: 12%;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.right {
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.boder-majorelleBlue {
  background-color: #3b3b3f !important;
  border: 1px solid #6a49e2 !important;
}
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
.content {
  width: 90%;
}
.max-height {
  max-height: calc(100vh-apx);
  overflow: hidden;
}
.main {
  overflow: hidden;
}
</style>
