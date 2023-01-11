<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    class="pa-6 border-radius-16 member-card mx-auto mt-8"
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
        Add Members
    </div>
    <v-form
      class="mt-5 pa-3"
      ref="choose-token"
      v-model="vm.chooseTokenForm"
      :style="'background:' + applicationStore.accentColor + ' !important;'"
    >
      <div>
        <div>Member's wallet</div>
        <v-text-field
          class="input-field border-radius-8 elevation-0 mt-2"
          v-model="vm.councilTokenAddress"
          :color="applicationStore.isDarkTheme ? 'white' : 'black'"
          :class="applicationStore.isDarkTheme ? 'white-text' : 'black-text'"
          :light="!applicationStore.isDarkTheme"
          placeholder="ex: Govffg894jRjkgfh08943jfVVudfL"
          :disabled="isSummary"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
 
    </v-form>
    <v-divider></v-divider>
    <div class="full-width d-flex justify-center my-4 justify-space-between">
      <v-btn
        class="text-none btn-text"
        :color="applicationStore.primaryColor"
        @click="vm.setAddMembers(false)"
        >Cancel</v-btn
      >
      <v-btn class="text-none btn-text" :color="applicationStore.primaryColor"
        >Add</v-btn
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
.member-card {
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
.onCursor {
  cursor: pointer;
}

.placeholer-lightTheme input::placeholder {
  color: black !important;
  opacity: 1;
}
.placeholer-lightTheme input,
.placeholer-lightTheme input {
  color: black !important;
}
.btn-advance {
  border: var(--v-primary-base) 1px solid;
  background: var(--v-gray11-base);
  width: 174px;
}
</style>
