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
    <v-form
      class="mt-5 pa-3"
      ref="choose-token"
      v-model="vm.chooseTokenForm"
      :style="'background:' + applicationStore.accentColor + ' !important;'"
    >
      <div>
        <div>Do you want to use council</div>
        <div class="gray6--text">This will change your council setting</div>
        <v-radio-group
          class="mt-3"
          v-model="vm.isCreateNewToken"
          :disabled="isSummary"
          mandatory
        >
          <v-radio :value="true" :color="applicationStore.primaryColor">
            <template v-slot:label>
              <div
                :class="
                  applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                "
              >
                Yes
              </div>
            </template></v-radio
          >
          <v-radio :value="false" :color="applicationStore.primaryColor">
            <template v-slot:label>
              <div
                :class="
                  applicationStore.isDarkTheme ? 'white--text' : 'black--text'
                "
              >
                No
              </div>
            </template></v-radio
          >
        </v-radio-group>
      </div>
      <v-slide-y-transition mode="out-in">
        <div v-show="!vm.isCreateNewToken">
          <div>
            <div>Council Token Mint Address</div>
            <v-text-field
              class="input-field border-radius-8 elevation-0 mt-2"
              v-model="vm.councilTokenAddress"
              :color="applicationStore.isDarkTheme ? 'white' : 'black'"
              :class="
                applicationStore.isDarkTheme ? 'white-text' : 'black-text'
              "
              :light="!applicationStore.isDarkTheme"
              placeholder="ex: 0x0CDF9acd87E940837ff21BB40c9fd55F68bba059"
              :disabled="isSummary"
              dense
              solo
              outlined
              clearable
            ></v-text-field>
          </div>

          <div>
            <div>Approval quorum (%)</div>
            <v-text-field
              type="number"
              class="input-field border-radius-8 elevation-0 mt-2"
              :color="applicationStore.isDarkTheme ? 'white' : 'black'"
              :class="
                applicationStore.isDarkTheme ? 'white-text' : 'black-text'
              "
              placeholder="ex: 20"
              :light="!applicationStore.isDarkTheme"
              v-model="vm.councilApprovalQuorum"
              :disabled="isSummary"
              dense
              solo
              outlined
              clearable
            ></v-text-field>
          </div>
        </div>
      </v-slide-y-transition>
      <div>
        <div>Threshold</div>
        <v-text-field
          class="input-field border-radius-8 elevation-0 mt-2"
          v-model="vm.councilTokenAddress"
          :color="applicationStore.isDarkTheme ? 'white' : 'black'"
          :class="applicationStore.isDarkTheme ? 'white-text' : 'black-text'"
          :light="!applicationStore.isDarkTheme"
          placeholder="ex: 60"
          :disabled="isSummary"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
      <div>
        <div>Weight</div>
        <v-text-field
          class="input-field border-radius-8 elevation-0 mt-2"
          v-model="vm.councilTokenAddress"
          :color="applicationStore.isDarkTheme ? 'white' : 'black'"
          :class="applicationStore.isDarkTheme ? 'white-text' : 'black-text'"
          :light="!applicationStore.isDarkTheme"
          placeholder="ex: 0"
          :disabled="isSummary"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
      <div>
        <div>Min Amount To Create</div>
        <v-text-field
          class="input-field border-radius-8 elevation-0 mt-2"
          v-model="vm.councilTokenAddress"
          :color="applicationStore.isDarkTheme ? 'white' : 'black'"
          :class="applicationStore.isDarkTheme ? 'white-text' : 'black-text'"
          :light="!applicationStore.isDarkTheme"
          placeholder="ex: 1000000"
          :disabled="isSummary"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
      <div>
        <div>Community Mint Factor</div>
        <v-text-field
          class="input-field border-radius-8 elevation-0 mt-2"
          v-model="vm.councilTokenAddress"
          :color="applicationStore.isDarkTheme ? 'white' : 'black'"
          :class="applicationStore.isDarkTheme ? 'white-text' : 'black-text'"
          :light="!applicationStore.isDarkTheme"
          placeholder="ex: 1"
          :disabled="isSummary"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
      <div>
        <div>Application Type</div>
        <div class="gray6--text">multi-sig</div>
      </div>
    </v-form>
    <v-divider></v-divider>
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
