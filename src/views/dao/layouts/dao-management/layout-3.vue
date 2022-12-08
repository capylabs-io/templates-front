<template>
  <div>Layout 3</div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../../models/dao-viewmodels";

@Component({
  components: {},
})
export default class DaoManagementLayout3 extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>