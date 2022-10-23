<template>
  <v-card
    class="
      pa-4
      box-gray-12
      rounded-lg
      text-sm
      font-weight-regular
      gray8--text
      mt-4
    "
    outlined
  >
    <div class="font-weight-bold text-lg white--text">Programs</div>
    <div class="program-info pa-4 mt-3 text-center ma-auto">
      <div class="mb-3">It’s empty here</div>
      <EmptyImg/>
      <div class="blueJeans--text align-center cursor-pointer mt-2">
        <v-icon small color="blueJeans">mdi-plus-circle-outline</v-icon>
        <span class="ml-1 align-self-end">New Program</span>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import EmptyImg from "@/components/svg/Empty-Img.vue";
@Observer
@Component({
  components: {
    EmptyImg,
  },
})
export default class Programs extends Vue {}
</script>
<style scoped>
.program-info {
  /* Grey/13 */
  background: #1e1e20;
  opacity: 0.8;
  /* Grey/11 */
  border: 1px solid #3b3b3f;
  border-radius: 8px;
}
</style>