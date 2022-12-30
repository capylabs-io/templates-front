<template>
  <div class="container mx-auto px-8">
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
import { Vue, Component, Provide } from "vue-property-decorator";
import { ThemeManagementViewmodel } from "../viewmodel/theme-management-viewmodel";

@Component({
  components: {
    ThemeCard: () => import("@/components/create-service/theme-card.vue"),
  },
})
export default class ThemeManagement extends Vue {
  @Provide() vm = new ThemeManagementViewmodel();

  async created() {
    await this.vm.fetchThemes();
  }

  chooseTheme(theme: ThemeModel) {
    this.$router.push(`/theme/${theme.id}`);
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