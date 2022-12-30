<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column">
    <div class="ma-auto my-5 px-4 params-management">
      <v-row>
        <v-col cols="12" class="ma-auto">
          <div class="pa-4 box-gray-12 rounded-lg parameters-page">
            <div class="d-flex">
              <div class="pa-0 cursor-pointer" text>
                <v-icon
                  :color="applicationStore.primaryColor"
                  small
                  @click="vm.setpickParameters(false), vm.setpickDao(true)"
                >
                  mdi-chevron-left</v-icon
                >
                <span
                  @click="vm.setpickParameters(false), vm.setpickDao(true)"
                  class="text-capitalize onCursor"
                  :style="
                    'color:' + applicationStore.primaryColor + ' !important'
                  "
                  >Back</span
                >
              </div>
            </div>
            <div class="d-flex align-center mt-3">
              <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
              <span class="font-weight-bold text-md gray5--text">
                Axie DAO</span
              >
            </div>
            <div class="text-dp-xs white--text font-weight-bold">
              DAO Parameters
            </div>
            <v-row class="pa-2">
              <v-col cols="12" md="6" class="pa-2 text-sm">
                <div class="gray13 border-radius-12 pa-4">
                  <div class="overflow-y-auto">
                    <div class="d-flex px-4">
                      <div class="text-lg white--text font-weight-bold">
                        Intructions
                      </div>
                    </div>
                  </div>
                  <div class="overflow-y-auto mt-3">
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">PubKey</div>
                        <div class="font-weight-bold">
                          {{ vm.daoSetting?.id }}
                        </div>
                      </div>
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
              <v-col cols="12" md="6" class="pa-2 text-sm">
                <div class="gray13 border-radius-12 pa-4">
                  <div class="overflow-y-auto">
                    <div class="d-flex px-4">
                      <div class="text-lg white--text font-weight-bold">
                        Config
                      </div>
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
                        <div class="text-overline-2 text-capitalize">
                          threshold
                        </div>
                        <div class="font-weight-bold">
                          {{ vm.daoSetting?.threshold }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2 text-capitalize">
                          Existed
                        </div>
                        <div class="font-weight-bold">
                          {{ vm.daoSetting?.isExisted }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2 text-capitalize">
                          Council
                        </div>
                        <div class="font-weight-bold">
                          {{ vm.daoSetting?.isCouncil }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2 text-capitalize">
                          createdAt
                        </div>
                        <div class="font-weight-bold">
                          {{ vm.daoSetting?.createdAt | ddmmyyyyhhmmss }}
                        </div>
                      </div>
                    </div>
                    <div class="params-btn">
                      <v-btn color="gray60" class="btn-gray-11"
                        >Change Config</v-btn
                      >
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
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
.params-management {
  width: 1900px;
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
  padding-left: 44%;
}
.onCursor {
  cursor: pointer;
}
</style>
