<template>
  <div class="dao-management mt-4">
    <v-row class="justify-center ma-auto">
      <v-col cols="10" md="7">
        <SolendDao />
      </v-col>
      <v-col cols="10" md="4">
        <YourAccount />
        <Programs/>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import SettingIcon from "@/components/svg/Settings-icon.vue";
import { Observer } from "mobx-vue";
import SolendDao from "../components/Solend-Dao.vue";
import YourAccount from "../components/_YourAccount.vue";
import Programs from "../components/_Programs.vue";
import { DaoViewModel } from "../models/dao-viewmodels";
@Observer
@Component({
  components: {
    SettingIcon,
    SolendDao,
    YourAccount,
    Programs,
  },
})
export default class Dao extends Vue {
  @Provide() vm = new DaoViewModel();
}
</script>