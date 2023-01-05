<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    class="pa-6 border-radius-16 config-card mx-auto mt-8"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important;'"
    :outlined="applicationStore.isDarkTheme"
    elevation="0"
  >
    <div class="mt-2 text-dp-xs white--text font-weight-bold text-center mb-8">
      Config update
    </div>
    <div class="text-lg font-weight-bold mt-2">Member's wallet</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        class=""
        placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="text-lg font-weight-bold mt-2">Title of your proposal</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        class=""
        placeholder="eg. Whatsupppp"
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="text-lg font-weight-bold mt-2">Description</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        class=""
        placeholder="eg: Introducte to new Features..."
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="text-lg font-weight-bold mt-2">Token amount</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        class=""
        placeholder="1"
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div
      class="full-width d-flex justify-center my-4 justify-space-between"
      @click="vm.setConfig(false)"
    >
      <v-btn class="text-none btn-text">Cancel</v-btn>
      <v-btn class="text-none btn-text" :color="applicationStore.primaryColor"
        >Update</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { Responsive } from "vue-responsive-components";
import { applicationStore } from "@/stores/application-store";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {
    Responsive,
  },
})
export default class DaoManagementParams extends Vue {
  @Inject() vm!: DaoViewModel;
  applicationStore = applicationStore;
}
</script>

<style lang="scss" scoped>
.config-card {
  max-width: 600px;
}
.config-page {
  .w-16 {
    width: 16px;
  }
  .active {
    background: #3b3b3f !important;
    border-radius: 12px;
    .gray3--text {
      color: white !important;
    }
  }
}
.config-btn {
  padding: 18px;
  padding-left: 42%;
}
.onCursor {
  cursor: pointer;
}
</style>
