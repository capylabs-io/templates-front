<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.accentColor + ' !important;'"
  >
    <div class="mt-2 text-dp-xs font-weight-bold text-center mb-8">
      IMPORT FILE
    </div>
    <template v-if="!vm.filesReview">
      <div class="mt-2 font-weight-bold pa-3 text-capitalize">
        <v-file-input
          :color="applicationStore.isDarkTheme ? 'white' : 'black'"
          :rules="[$rules.required]"
          @change="onFileChanged($event)"
          outlined
          flat
          filled
        ></v-file-input>
      </div>
    </template>
    <template v-else>
      <div class="ma-3">
        <v-text-field
          class="input-field border-radius-8 elevation-0"
          v-model="vm.memberTableSearchKey"
          placeholder="Search Member"
          :light="!applicationStore.isDarkTheme"
          :color="applicationStore.primaryColor"
          hide-details
          dense
          solo
          clearable
        ></v-text-field>
      </div>
      <v-data-table
        :headers="headers"
        :items="vm.fileResults"
        :style="'background:' + applicationStore.primaryColor + ' !important;'"
        class="ma-3 pa-2"
      >
      </v-data-table>
    </template>
    <v-divider></v-divider>
    <div
      class="full-width d-flex justify-center my-2 justify-space-between pa-3"
    >
      <v-btn
        class="text-none btn-text"
        :color="applicationStore.primaryColor"
        @click="vm.setAddMembers(false)"
        >Cancel</v-btn
      >
      <v-btn
        class="text-none btn-text"
        :color="applicationStore.primaryColor"
        :disabled="!vm.filesReview"
        @click="onAddMemberImported"
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
  headers = [{ text: "Wallet Address", value: "wallet" }];
  onAddMember() {
    this.vm.addMember();
  }
  onFileChanged(data: any) {
    this.vm.filesReview = true;
    this.vm.readFile(data);
  }
  onAddMemberImported() {
    this.vm.addMemberImported();
  }
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
