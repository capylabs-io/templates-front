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
    <v-tabs
      v-model="vm.tab"
      :background-color="applicationStore.primaryColor"
      :color="applicationStore.isDarkTheme ? 'white' : 'black'"
      grow
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1" :key="1"> Manual </v-tab>

      <v-tab href="#tab-2" :key="2"> Import File </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="vm.tab"
      :style="'background:' + applicationStore.cardColor + ' !important;'"
    >
      <v-tab-item :key="1" :value="'tab-' + 1">
        <Manual></Manual>
      </v-tab-item>
      <v-tab-item :key="2" :value="'tab-' + 2"> </v-tab-item>
      <Imported></Imported>
    </v-tabs-items>
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
    Manual: () => import("../components/Add-Member-manual.vue"),
    Imported: () => import("../components/Add-Member-imported.vue"),
  },
})
export default class DaoManagementParams extends Vue {
  @Inject() vm!: DaoViewModel;
  applicationStore = applicationStore;
  onAddMember() {
    this.vm.addMember();
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
