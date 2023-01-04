<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="isOpen"
    max-width="320px"
    :overlay-opacity="0.9"
  >
    <v-card class="box-gray-12 border-radius-16 pa-6" v-if="success">
      <div class="d-flex flex-column align-center">
        <div>
          <v-icon color="success" x-large>mdi-check-circle-outline</v-icon>
        </div>
        <div class="text-lg font-weight-bold mt-2">Purchased Successfully!</div>
        <div class="text-sm gray3--text text-center mt-2">
          You can check your Theme in <br />Account > Theme Management
        </div>
        <div class="d-flex align-center justify-space-between full-width mt-4">
          <v-btn
            class="text-none btn-text border-radius-8"
            color="gray11"
            elevation="0"
            @click="backToShop()"
            >Keep Shopping</v-btn
          >
          <v-btn
            class="text-none btn-text border-radius-8"
            color="primary"
            elevation="0"
            @click="goToInventory()"
            >Check Inventory</v-btn
          >
        </div>
      </div>
    </v-card>
    <v-card class="box-gray-12 border-radius-16 pa-6" v-else>
      <div class="d-flex flex-column align-center">
        <div>
          <v-icon color="error" x-large>mdi-alert-circle-outline</v-icon>
        </div>
        <div class="text-lg font-weight-bold mt-2">
          Oh no! Something went wrong.
        </div>
        <div class="text-sm error--text text-center mt-2">
          Wer are unable to process your payment. <br />Please try again later!
        </div>
        <div class="d-flex align-center justify-space-between full-width mt-4">
          <v-btn
            class="text-none btn-text border-radius-8"
            color="gray11"
            elevation="0"
            @click="$emit('onCancel')"
            >Cancel</v-btn
          >
          <v-btn
            class="text-none btn-text border-radius-8"
            color="primary"
            elevation="0"
            @click="$emit('onConfirm')"
            >Try again</v-btn
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

  backToShop() {
    this.$router.push(`/theme-market`);
  }

  goToInventory() {
    this.$router.push(`/theme-management`);
  }
}
</script>
