<template>
  <v-footer class="dao-footer top-border-gray5">
    <v-row class="full-width d-flex justify-space-between px-2">
      <v-col cols="3"></v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-img
          :src="require('@/assets/icons/twitter.png')"
          max-width="24px"
          contain
        ></v-img>
      </v-col>
      <v-col cols="3">
        <div class="text-right text-sm">
          Powered by <span class="font-weight-bold white--text">Cyberk</span>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DaoNavigationBar extends Vue {
  @Prop({ default: false }) isReview!: boolean;
}
</script>

<style scoped>
.top-border-gray5 {
  border-top: 1px solid var(--v-gray11-base);
}
.dao-footer {
  height: 52px;
}
</style>