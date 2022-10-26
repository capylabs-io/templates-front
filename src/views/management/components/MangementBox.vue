<template>
  <v-card class="card my-4 gray12 rounded-xl boder-gray-10">
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> 
    -->
    <v-img
      height="70%"
      :src="require(`@/assets/ManagementBox/ManagementBox${content.index}.png`)"
    ></v-img>
    <div class="ml-2 d-flex flex-row">
      <div>
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

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div class="align-self-center pl-12">
            <v-btn
              color="transparent"
              icon
              elevation="o"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large color="white"> mdi-dots-horizontal </v-icon>
            </v-btn>
          </div>
        </template>
        <v-list class="gray12">
          <v-list-item v-for="(item, index) in dropdown" :key="index">
            <v-list-item-title>{{ item.action }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <div class="align-self-center pl-12">
        <v-icon large color="white"> mdi-dots-horizontal </v-icon>
      </div> -->
    </div>
  </v-card>
</template>
<script lang="ts">
export default {
  props: ["content"],
  data() {
    return { dropdown: [{ action: "Add" }, { action: "Delete" }] };
  },
};
</script>

<style scoped>
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
.card {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
}
</style>
