<template>
  <v-dialog v-model="controller.dialog" max-width="482px" persistent>
    <v-card class="pb-2 border-radius-8 card-bg">
      <v-card-title class="dialog-title">
        <div class="ma-auto">{{ controller.config.title }}</div>
        <v-icon class="mr-1" @click="controller.cancel">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="my-6">
        <!-- <v-icon color="primary" class="mr-2" x-large>mdi-alert</v-icon> -->
        <div
          class="dialog-content mb-0"
          v-if="controller.config.content"
          v-html="controller.config.content"
        ></div>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-center px-6 pt-0 pb-4">
        <v-btn
          v-show="!controller.config.hideCancel"
          @click="controller.cancel"
          class="border-radius-8 text-none btn-text py-2 px-3"
          depressed
          color="#565A61"
          >{{ controller.config.cancelText || "Cancel" }}</v-btn
        >
        <v-btn
          v-show="!controller.config.hideDone"
          @click="controller.done"
          class="border-radius-8 text-none btn-text py-2 px-3"
          depressed
          color="#DCBD27"
          >{{ controller.config.doneText || "Yes" }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { confirmDialogController } from "./confirm-dialog-controller";
@Component({})
export default class ConfirmDialog extends Vue {
  controller = confirmDialogController;
}
</script>

<style>
.dialog-title {
  font-family: "Proxima Nova";
  font-style: normal;
  font-weight: 600 !important;
  font-size: 20px !important;
  line-height: 28px;
  letter-spacing: -0.01em;
}
.tab-content-title {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.dialog-content {
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #ffffff;
}
</style>