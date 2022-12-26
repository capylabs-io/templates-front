<template>
  <div>
    <v-form v-model="vm.socialMediaForm" ref="socialMediaForm">
      <div
        class="d-flex"
        v-for="(socialMedia, index) in applicationStore.socialMedias"
        :key="index"
      >
        <div class="d-flex align-center">
          <v-select
            class="media-select"
            color="primary"
            :value="applicationStore.socialMedias[index].title"
            :items="applicationStore.socialMediaIcons"
            @input="vm.changeSocialMediaIcon(index, $event)"
            item-value="title"
            return-object
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
            :value="applicationStore.socialMedias[index].url"
            :rules="[$rules.required, $rules.url]"
            outlined
            dense
          ></v-text-field>
        </div>
        <v-btn
          @click.stop="vm.removeSocialMedia(index)"
          :disabled="applicationStore.socialMedias.length <= 1"
          icon
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn
          class="btn-text text-none"
          elevation="0"
          color="primary"
          @click.stop="vm.addSocialMedia()"
          v-if="applicationStore.socialMedias.length <= 9"
        >
          Add
          <v-icon class="ml-1" small>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
  
  <script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;

  applicationStore = applicationStore;
}
</script>

<style scoped>
.media-select {
  max-width: 80px !important;
}
</style>