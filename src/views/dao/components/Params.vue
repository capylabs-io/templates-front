<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    class="pa-6 border-radius-16 params-card mx-auto mt-8"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important;'"
    :outlined="applicationStore.isDarkTheme"
    elevation="0"
  >
    <div
      class="d-flex cursor-pointer"
      @click="vm.setpickParameters(false), vm.setpickDao(true)"
      text
    >
      <v-icon :color="applicationStore.primaryColor" small>
        mdi-chevron-left</v-icon
      >
      <span
        :style="'color:' + applicationStore.primaryColor + ' !important'"
        class="text-capitalize onCursor"
        >Back</span
      >
    </div>

    <div>
      <div class="d-flex align-center mt-3">
        <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
        <span class="font-weight-bold text-md gray5--text"> Axie DAO</span>
      </div>
      <div class="text-dp-xs white--text font-weight-bold mt-1">
        DAO Parameters
      </div>
    </div>

    <v-row class="mt-1">
      <v-col cols="12" md="6" class="text-sm">
        <div
          class="border-radius-16 pa-4 full-height"
          :class="{ 'box-border-gray11': applicationStore.isDarkTheme }"
          :style="'background:' + applicationStore.accentColor + ' !important'"
        >
          <div class="text-lg font-weight-bold">Intructions</div>
          <div class="text-sm mt-4">
            <div class="gray6--text">PubKey</div>
            <div class="font-weight-bold">
              {{ vm.daoSetting?.id }}
            </div>
          </div>

          <div class="overflow-y-auto mt-3">
            <div class="d-flex pa-4">
              <div class="gray3--text"></div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2">Authority</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.id }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2">Owner</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.id }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2">Community Mint</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.id }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2">Council Mint</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.id }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="text-sm">
        <div
          class="border-radius-12 pa-4 full-height"
          :class="{ 'box-border-gray11': applicationStore.isDarkTheme }"
          :style="'background:' + applicationStore.accentColor + ' !important'"
        >
          <div class="overflow-y-auto">
            <div class="d-flex px-4">
              <div class="text-lg white--text font-weight-bold">Config</div>
            </div>
          </div>
          <div class="overflow-y-auto mt-3">
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2 text-capitalize">
                  council Approval Quorum
                </div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.council?.councilApprovalQuorum }}
                </div>
              </div>
            </div>

            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2 text-capitalize">Type</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.type }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2 text-capitalize">threshold</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.threshold }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2 text-capitalize">Existed</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.isExisted }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2 text-capitalize">Council</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.isCouncil }}
                </div>
              </div>
            </div>
            <div class="d-flex pa-4">
              <div class="gray3--text">
                <div class="text-overline-2 text-capitalize">createdAt</div>
                <div class="font-weight-bold">
                  {{ vm.daoSetting?.createdAt | ddmmyyyyhhmmss }}
                </div>
              </div>
            </div>
            <div class="full-width d-flex justify-center my-3">
              <v-btn
                class="text-none btn-text"
                :color="applicationStore.primaryColor"
                >Change Config</v-btn
              >
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
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
.params-card {
  max-width: 960px;
}
.parameters-page {
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
.params-btn {
  padding: 18px;
  padding-left: 42%;
}
.onCursor {
  cursor: pointer;
}
</style>
