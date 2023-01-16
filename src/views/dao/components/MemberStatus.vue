<template>
  <div
    class="d-flex align-center border-radius-16"
    :style="'background:' + color + ' !important'"
  >
    <div v-if="status === true">
      <div class="d-flex align-center pa-2">
        <v-icon color="success" small>mdi-thumb-up</v-icon>
        <div class="ml-2">Yes</div>
      </div>
    </div>
    <div v-else>
      <div class="d-flex align-center pa-2">
        <v-icon color="error" small>mdi-thumb-down</v-icon>
        <div class="ml-2">No</div>
      </div>
    </div>
    <v-divider
      :color="applicationStore.isDarkTheme ? 'black' : 'white'"
      vertical
    ></v-divider>
    <div class="pa-2">999999 SLND</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Responsive } from "vue-responsive-components";
import { applicationStore } from "@/stores/application-store";

@Observer
@Component({
  components: {
    Responsive,
  },
})
export default class VoteStatus extends Vue {
  @Prop({ default: "" }) status?: string;
  @Prop({ default: "0" }) voteAmount?: string;
  @Prop({ default: "#fffff" }) color?: string;

  applicationStore = applicationStore;
}
</script>
