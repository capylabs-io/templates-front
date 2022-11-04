<template>
  <v-hover v-slot="{ hover }">
    <v-card
      elevation="12"
      class="
        card
        gray12
        border-radius-16
        boder-gray-10
        d-flex
        flex-column
        overflow-hidden
      "
      :class="{ 'on-hover cursor-pointer': hover }"
    >
    <div class="type pa-1"><span class="px-2">{{applicationService}}</span></div>

      <CoverImage :imageUrl="applicationCoverImage" />
      <div class="d-flex justify-space-between px-4 py-3">
        <div class="flex-grow-1 application-title">
          <div class="d-flex">
            <v-img
              :src="require('@/assets/web-icon.png')"
              max-width="18px"
              contain
            ></v-img>
            <div
              class="
                ml-2
                white--text
                text-sm
                font-weight-medium
                application-name
                text-truncate
              "
            >
              {{ applicationName }}
            </div>
          </div>

          <div class="mt-2">
            <div class="gray5--text text-xs">
              <span class="text-caplitalize">{{ applicationStatus }}</span>
              - {{ applicationUpdatedAt | normalizeTimeDuration }}
            </div>
          </div>
        </div>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center ml-4">
              <v-btn icon elevation="o" v-bind="attrs" v-on="on">
                <v-icon color="white"> mdi-dots-horizontal </v-icon>
              </v-btn>
            </div>
          </template>
          <v-list class="gray12">
            <v-list-item>
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { ApplicationModel } from "@/models/application-model";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
  },
})
export default class ManagementBox extends Vue {
  @Prop() application?: ApplicationModel;

  get applicationName() {
    if (!this.application || !this.application.name) return "Your Application";
    return this.application.name;
  }
  get applicationService() {
    if (!this.application || !this.application.service) return "Your Application";
    return this.application.service.toUpperCase();
  }

  get applicationUpdatedAt() {
    if (!this.application || !this.application.updatedAt) return Date.now();
    return new Date(this.application.updatedAt);
  }

  get applicationCoverImage() {
    if (!this.application || !this.application.metadata) return "";
    return this.application.metadata.coverImage;
  }

  get applicationStatus() {
    if (
      !this.application ||
      !this.application.status ||
      this.application.status === "draft"
    )
      return "In Draft";
    return this.application.status;
  }
}
</script>

<style scoped>
.boder-gray-10 {
  border: 1px solid #4f4f54 !important;
}
.card {
  white-space: nowrap;
  text-overflow: ellipsis;
  align-self: center;
  background: var(--v-gray12-base) !important;
}
.on-hover {
  border: 1px solid var(--v-primary-base) !important;
}
.application-title {
  width: calc(100% - 26px - 16px * 2) !important;
}
.type {
  position: absolute;
  font-size: medium;
  z-index: 2;
  top: 12px;
  left: 11px;
  background-color: var(--v-gray12-base) !important;
  width: max-content;
  height: max-content;
  border-radius: inherit;
}
</style>
