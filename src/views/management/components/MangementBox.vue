<template>
  <v-card class="card my-4 gray12 rounded-xl boder-gray-10">
    <v-img
      height="70%"
      :src="require(`@/assets/ManagementBox/ManagementBox${content.index}.png`)"
    ></v-img>
    <div class="d-flex flex-row justify-space-between mx-4">
      <div class="align-self-center">
        <v-card-title
          ><v-img
            :src="require('@/assets/web-icon.png')"
            max-width="18px"
            contain
          ></v-img>
          <div class="ml-2 card-title">
            {{ content.name }}
          </div></v-card-title
        >

        <v-card-text>
          <v-row align="center" class="mx-0 gray7--text card-description">
            <div>{{ content.description }}</div>
          </v-row>
        </v-card-text>
      </div>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div class="align-self-center pr-6">
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
  width: 22.5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
}
.card-title {
  font-size: 14px;
  font-weight: 500px;
}
.card-description {
  font-size: 12px;
  font-weight: 400px;
}
</style>
