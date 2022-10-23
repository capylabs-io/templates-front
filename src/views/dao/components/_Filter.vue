<template>
  <v-card>
    <v-checkbox
      v-model="checkbox"
      value="Cancelled"
      label="Cancelled"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox"
      value="Completed"
      label="Completed"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox"
      value="Defeated"
      label="Defeated"
    ></v-checkbox>
    <v-checkbox v-model="checkbox" value="Draft" label="Draft"></v-checkbox>
    <v-checkbox
      v-model="checkbox"
      value="Excuting"
      label="Excuting"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox"
      value="ExcutingWithErrors"
      label="ExcutingWithErrors"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox"
      value="SigningOff"
      label="SigningOff"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox"
      value="Succeeded"
      label="Succeeded"
    ></v-checkbox>
    <v-checkbox v-model="checkbox" value="Voting" label="Voting"></v-checkbox>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { observable } from "mobx";
@Observer
@Component({
  components: {},
})
export default class Filter extends Vue {
    @observable checkbox;
}
</script>