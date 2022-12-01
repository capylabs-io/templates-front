<template>
  <div>
    <div class="d-flex align-center">
      <div class="d-flex align-center">
        <v-select
          class="media-select"
          :items="vm.mediaIcons"
          hide-details
          outlined
          dense
        >
          <template #selection="{ item }">
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <template #item="{ item }">
            <div class="media-select-item">
              <v-icon>{{ item.icon }}</v-icon>
            </div>
          </template>
        </v-select>
        <v-divider vertical></v-divider>
        <v-text-field hide-details outlined dense></v-text-field>
      </div>
      <v-btn icon>
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;
}
</script>