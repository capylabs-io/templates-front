<template>
    <div>Layout 2</div>
  </template>
    
    <script lang="ts">
  import { Vue, Component, Inject } from "vue-property-decorator";
  import { DaoViewModel } from "../../models/dao-viewmodels";
  
  @Component({
    components: {},
  })
  export default class ProposalDaoLayout2 extends Vue {
    @Inject() vm!: DaoViewModel;
  }
  </script>