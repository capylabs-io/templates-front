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
    <div class="mt-2 text-dp-xs font-weight-bold text-center mb-8">
      Config update
    </div>
    <div class="text-lg font-weight-bold mt-2">Member's wallet</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        outlined
        :color="applicationStore.isDarkTheme ? 'white' : 'black'"
        :class="applicationStore.isDarkTheme ? 'white-text' : 'placeholer-lightTheme'"
        placeholder="eg. Govffg894jRjkgfh08943jfVVudfL"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="text-lg font-weight-bold mt-2">Title of your proposal</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        :color="applicationStore.accentColor"
        :class="applicationStore.isDarkTheme ? 'white--text' : 'black--text'"
        placeholder="eg. Whatsupppp"
        hide-details="auto"
        outlined
      ></v-text-field>
    </div>
    <div class="text-lg font-weight-bold mt-2">Description</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-textarea
        :color="applicationStore.accentColor"
        :class="applicationStore.isDarkTheme ? 'white--text' : 'black--text'"
        placeholder="eg: Introducte to new Features..."
        :rules="rules"
        hide-details="auto"
        no-resize
        outlined
      ></v-textarea>
    </div>
    <div class="text-lg font-weight-bold mt-2">Token amount</div>
    <div
      class="mt-2"
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <v-text-field
        :color="applicationStore.accentColor"
        :class="applicationStore.isDarkTheme ? 'white--text' : 'black--text'"
        placeholder="1"
        hide-details="auto"
        outlined
      ></v-text-field>
    </div>
    <div
      class="full-width d-flex justify-center my-4 justify-space-between"
      @click="vm.setConfig(false)"
    >
      <v-btn class="text-none btn-text" :color="applicationStore.primaryColor"
        >Cancel</v-btn
      >
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
.placeholer-lightTheme input::placeholder {
  color: black!important;
  opacity: 1;
}
.placeholer-lightTheme input,
.placeholer-lightTheme input{
  color: black!important;
}
</style>
