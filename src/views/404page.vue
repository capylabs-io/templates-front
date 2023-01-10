<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="notfound-page d-flex">
    <div class="text-h4 mx-auto align-self-center">404 Page Not Found</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Responsive } from "vue-responsive-components";
import { applicationStore } from "@/stores/application-store";

@Component({
  components: {
    Responsive,
  },
})
export default class DaoManagementParams extends Vue {
  applicationStore = applicationStore;
}
</script>

<style lang="scss" scoped>
.notfound-page {
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
