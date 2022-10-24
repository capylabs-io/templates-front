<template>
  <v-card class="card my-10 gray12 rounded-xl boder-gray-10">
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> -->
    <!-- src="../assets/ManagementBox/ManagementBox1.png" -->
    <v-img height="70%" :src="require(`../assets/ManagementBox/ManagementBox${content.index}.png`)"></v-img>
    <div class="ml-2">
      <v-card-title
        ><v-img
          :src="require('@/assets/web-icon.png')"
          max-width="18px"
          contain
        ></v-img>
        <div class="ml-2 title">{{ content.name }}</div></v-card-title
      >

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div>{{ content.description }}</div>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>
<script lang="ts">
export default {
  props: ["content"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
.card {
  width: 20%;
}
</style>
