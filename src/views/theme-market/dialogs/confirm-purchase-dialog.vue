<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="isOpen"
    max-width="420px"
    :overlay-opacity="0.9"
  >
    <v-card class="box-gray-12 border-radius-16 pa-6">
      <div class="d-flex flex-column align-center">
        <div>
          <v-icon color="mango" x-large>mdi-cart-outline</v-icon>
        </div>
        <div class="text-lg font-weight-bold mt-2">Purchase Confirmation</div>
        <div class="text-sm gray6--text text-center mt-2">
          Are you sure you want to purchase
          <span class="white--text font-weight-bold">{{
            themeName || "this theme"
          }}</span>
          for
          <span class="white--text font-weight-bold">{{
            themePrice | usd
          }}</span
          >?
          <br />
          All purchases are non-refundable!
        </div>
        <div class="d-flex align-center justify-space-between mt-4">
          <v-btn
            class="text-none btn-text border-radius-8 mr-10"
            color="gray11"
            elevation="0"
            @click="onBtnCancelClicked()"
            >Cancel</v-btn
          >
          <v-btn
            class="text-none btn-text border-radius-8"
            color="primary"
            elevation="0"
            @click="onBtnConfirmClicked()"
            >Confirm</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Observer
@Component({
  components: {},
})
export default class PurchaseResultDialog extends Vue {
  @Prop({ default: false }) isOpen!: boolean;
  @Prop({ default: false }) success?: boolean;
  @Prop() themeName!: string;
  @Prop() themePrice!: string;

  onBtnCancelClicked() {
    this.$emit("onCancel");
  }
  onBtnConfirmClicked() {
    this.$emit("onConfirm");
  }
}
</script>
