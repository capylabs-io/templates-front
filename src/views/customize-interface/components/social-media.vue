<template>
  <div>
    <div class="d-flex align-center">
      <div
        class="d-flex align-center"
        v-for="(socialMedia, index) in vm.socialMedias"
        :key="index"
      >
        <v-select
          class="media-select"
          color="primary"
          :value="vm.socialMedias[index].title"
          :items="layoutStore.socialMediaIcons"
          @change="vm.changeSocialMedia(index, $event)"
          item-value="title"
          return-object
          hide-details
          outlined
          dense
        >
          <template #selection="{ item }">
            <v-img
              :src="require('@/assets/icons/' + item.icon)"
              max-width="24px"
              max-height="24px"
            />
          </template>
          <template #item="{ item }">
            <v-img
              :src="require('@/assets/icons/' + item.icon)"
              max-width="24px"
              max-height="24px"
            />
          </template>
        </v-select>
        <v-text-field
          @change="vm.changeSocialMediaUrl(index, $event)"
          hide-details
          outlined
          dense
        ></v-text-field>
      </div>
      <v-btn icon>
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </div>
    <div class="mt-4">
      <v-btn class="btn-text text-none" elevation="0" color="primary">
        Add
        <v-icon class="ml-1" small>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;

  layoutStore = layoutStore;
}
</script>

<style scoped>
.media-select {
  max-width: 80px !important;
}
</style>