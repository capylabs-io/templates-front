<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="d-flex align-center py-4"
        outlined
        :color="statusColor"
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ statusIcon }}</v-icon>
        <div class="text-capitalize align-seft-center ml-2" v-if="!isSmall">
          {{ status }}
        </div>
      </v-btn>
    </template>
    <span class="text-capitalize">{{ status }}</span>
  </v-tooltip>
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
export default class ProposalStatus extends Vue {
  @Prop({ default: "executing" }) status!: string;
  @Prop({ default: false }) isSmall!: boolean;

  layoutStore = layoutStore;

  get statusColor() {
    switch (this.status) {
      case "passed":
        return "success";
      case "failed":
        return "error";
      case "voting":
      case "executing":
        return layoutStore.isDarkTheme ? "white" : "black";
      case "cancelled":
      case "draft":
        return "gray5";
      default:
        return layoutStore.isDarkTheme ? "white" : "black";
    }
  }

  get statusIcon() {
    switch (this.status) {
      case "passed":
        return "mdi-check";
      case "failed":
        return "mdi-close";
      case "voting":
      case "executing":
        return "mdi-spin mdi-loading";
      case "cancelled":
        return "mdi-cancel";
      default:
        return "mdi-file-document";
    }
  }
}
</script>