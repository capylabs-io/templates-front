<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column">
    <div class="ma-auto px-8 py-3 params-management">
      <v-row>
        <v-col cols="12" class="ma-auto">
          <div class="pa-4 box-gray-12 rounded-lg parameters-page">
            <div class="d-flex">
              <div class="pa-0 cursor-pointer" text>
                <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
                <span class="text-capitalize blueJeans--text">Back</span>
              </div>
            </div>
            <div class="d-flex align-center mt-3">
              <img class="mr-2 w-16" src="@/assets/axie-icon.png" />
              <span class="font-weight-bold text-md gray5--text">Axie DAO</span>
            </div>
            <div class="text-dp-xs white--text font-weight-bold">
              DAO Parameters {{ daoSettingModel?.tokenAddress }}
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
                          8576jfkghdOPuer9041NBDKU02349
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Authority</div>
                        <div class="font-weight-bold">
                          8576jfkghdOPuer9041NBDKU02349
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Owner</div>
                        <div class="font-weight-bold">
                          8576jfkghdOPuer9041NBDKU02349
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Community Mint</div>
                        <div class="font-weight-bold">
                          8576jfkghdOPuer9041NBDKU02349
                        </div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Council Mint</div>
                        <div class="font-weight-bold">
                          8576jfkghdOPuer9041NBDKU02349
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
                        <div class="text-overline-2">Config 1</div>
                        <div class="font-weight-bold">100%</div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Config 1</div>
                        <div class="font-weight-bold">100%</div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Config 1</div>
                        <div class="font-weight-bold">100%</div>
                      </div>
                    </div>
                    <div class="d-flex pa-4">
                      <div class="gray3--text">
                        <div class="text-overline-2">Config 1</div>
                        <div class="font-weight-bold">100%</div>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { DaoSettingModel } from "../../../models/dao-setting-model";
import { Responsive } from "vue-responsive-components";

@Component({
  components: {
    Responsive,
  },
})
export default class DaoManagementParams extends Vue {
  @Prop() daoSettingModel?: DaoSettingModel;
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
</style>
