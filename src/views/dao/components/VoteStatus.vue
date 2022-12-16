<template>
  <div
    class="d-flex align-center border-radius-16"
    :style="'background:' + layoutStore.cardBackground + ' !important'"
  >
    <div class="d-flex align-center pa-2">
      <v-icon color="success" small>mdi-thumb-up</v-icon>
      <div class="ml-2">Yes</div>
    </div>
    <v-divider
      :color="layoutStore.isDarkTheme ? 'black' : 'white'"
      vertical
    ></v-divider>
    <div class="pa-2">999999 SLND</div>
  </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Responsive } from "vue-responsive-components";
import { layoutStore } from "@/stores/layout-store";

@Observer
@Component({
  components: {
    Responsive,
  },
})
export default class VoteStatus extends Vue {
  @Prop({ default: "executing" }) status?: string;
  @Prop({ default: "0" }) voteAmount?: string;

  layoutStore = layoutStore;
}
</script>