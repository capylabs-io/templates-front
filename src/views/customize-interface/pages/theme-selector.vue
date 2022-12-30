<template>
  <div class="container mx-auto px-8">
    <div class="text-dp-lg text-center font-weight-bold my-12">
      Select the theme for you DAO
    </div>
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <div>Sort by</div>
        <v-select
          class="sort-box ml-4"
          v-model="vm.sortBy"
          :items="vm.themeTypes"
          hide-details
          solo
          dense
        ></v-select>
      </div>
      <div>
        <v-text-field
          class="input-field border-radius-8 elevation-0"
          v-model="vm.searchKey"
          color="primary"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          hide-details
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </div>
    </div>

    <v-row class="mt-6">
      <v-col
        cols="12"
        md="4"
        sm="6"
        v-for="theme in vm.slicedThemes"
        :key="theme.id"
      >
        <ThemeCard :theme="theme" @onChooseTheme="chooseTheme($event)" />
      </v-col>
    </v-row>
    <div class="my-6">
      <v-pagination
        v-model="vm.themePage"
        :length="vm.totalThemePage"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ThemeModel } from "@/models/theme-model";
import { applicationStore } from "@/stores/application-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {
    ThemeCard: () => import("@/components/create-service/theme-card.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;
  applicationStore = applicationStore;

  async created() {
    await this.vm.fetchThemes();
  }

  chooseTheme(theme: ThemeModel) {
    applicationStore.setupThemeConfig(theme);
    this.vm.setChoosingTheme(false);
  }
}
</script>

<style scoped>
.container {
  max-width: 1400px;
}
.sort-box {
  max-width: 128px;
}
.search-box {
  min-width: 400px;
}
</style>