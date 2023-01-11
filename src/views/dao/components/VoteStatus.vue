<template>
  <v-card
    class="d-flex align-center border-radius-8 vote-status py-1 px-3 text-xs"
    :class="{
      'box-border-gray11 white--text': applicationStore.isDarkTheme,
      'black--text': !applicationStore.isDarkTheme,
      'px-5 py-2 text-md': !small,
    }"
    :style="'background:' + applicationStore.pageBackground + ' !important;'"
    outlined
  >
    <v-icon :color="yes ? 'success' : 'error'" small>{{
      yes ? "mdi-thumb-up-outline" : "mdi-thumb-down-outline"
    }}</v-icon>
    <div class="ml-1">{{ yes ? "Yes" : "No" }}</div>
    <v-divider
      :class="small ? 'mx-2' : 'mx-3'"
      :color="
        applicationStore.isDarkTheme ? 'gray' : applicationStore.accentColor
      "
      vertical
    ></v-divider>
    <div
      class="font-weight-bold mr-1"
      :class="yes ? 'success--text' : 'error--text'"
    >
      {{ amount | formatNumber(0) }}
    </div>
    <div>
      {{ token }}
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { applicationStore } from "@/stores/application-store";

@Observer
@Component({
  components: {},
})
export default class VoteStatus extends Vue {
  @Prop({ default: false }) small!: boolean;
  @Prop({ default: false }) yes?: boolean;
  @Prop({ default: "0" }) amount?: string;
  @Prop({ default: "Token" }) token?: string;

  applicationStore = applicationStore;
}
</script>

<style scoped>
.vote-status {
  max-width: max-content;
}
</style>
