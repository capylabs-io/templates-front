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
        full-width full-height
      "
      :class="{ 'on-hover cursor-pointer': hover }"
      @click="goToDomain()"
    >
      <v-chip
        class="online-status font-weight-bold"
        v-if="application?.status && application.status == 'running'"
        color="success"
        small
      >
        Online
      </v-chip>
      <CoverImage
        :imageUrl="applicationCoverImage"
        :defaultImageUrl="require('@/assets/ManagementBox/default.png')"
      />
      <div class="d-flex justify-space-between px-4 py-3">
        <div class="flex-grow-1 application-title">
          <div class="d-flex align-center">
            <CoverImage
              class="application-token-icon"
              :imageUrl="applicationTokenIcon"
              :defaultImageUrl="require('@/assets/web-icon.png')"
            />
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="
                    ml-2
                    white--text
                    text-sm
                    font-weight-medium
                    application-name
                    text-truncate
                  "
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ applicationName }}
                </div>
              </template>
              <span class="font-weight-bold"> {{ application?.name }}</span>
            </v-tooltip>
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
          <v-list class="gray12" v-if="!trash">
            <v-list-item
              :to="`/customize-interface?type=${application?.service}&appId=${application?.appId}`"
            >
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onBtnDeleteClick">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list class="gray12" v-else>
            <v-list-item @click="onBtnRestoreClick">
              <v-list-item-title>Restore</v-list-item-title>
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
  @Prop({ default: false }) trash!: boolean;

  goToDomain() {
    if (!this.application || !this.application.service) return;
    if (this.trash) return;
    if (this.application.service != "dao") return; //TODO: Remove this
    this.$router.push({
      path: "/dao/" + this.application.appId.toString(),
    });
  }

  onBtnDeleteClick() {
    this.$emit("deleteApplication", this.application);
  }

  onBtnRestoreClick() {
    this.$emit("restoreApplication", this.application);
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
    if (
      !this.application ||
      !this.application.metadata ||
      !this.application.metadata.img ||
      !this.application.metadata.img.banner
    )
      return "";
    return this.application.metadata.img.banner;
  }

  get applicationTokenIcon() {
    if (
      !this.application ||
      !this.application.metadata ||
      !this.application.metadata.img ||
      !this.application.metadata.img.tokenIcon
    )
      return "";
    return this.application.metadata.img.tokenIcon;
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
.application-token-icon {
  max-width: 16px;
  max-height: 16px;
}
.online-status {
  position: absolute;
  right: 8px;
  top: 8px;
}
</style>
