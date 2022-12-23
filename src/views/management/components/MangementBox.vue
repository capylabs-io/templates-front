<template>
  <v-hover v-slot="{ hover }">
    <v-card
      elevation="12"
      class="
        card
        gray12
        border-radius-16 border-gray-11
        d-flex
        flex-column
        overflow-hidden
      "
      :class="{ 'on-hover cursor-pointer': hover }"
      @click="goToDomain()"
    >
      <CoverImage
        :imageUrl="applicationCoverImage"
        :defaultImageUrl="require('@/assets/ManagementBox/default.png')"
      />
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
              <span class="text-capitalize">{{ applicationStatus }}</span>
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
            <v-list-item
              :to="`/customize-interface?type=${application?.service}&appId=${application?.appId}`"
            >
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

  goToDomain() {
    if (!this.application || !this.application.service) return;
    if (this.application.service != "dao") return; //TODO: Remove this
    console.log("route", "/dao/" + this.application.appId.toString());

    this.$router.push({
      path: "/dao/" + this.application.appId.toString(),
    });
  }

  get applicationName() {
    if (!this.application || !this.application.name) return "Your Application";
    return this.application.name;
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
.border-gray-11 {
  border: 1px solid var(--v-gray11-base) !important;
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
</style>
