<template>
  <div class="app">
    <apexcharts
      width="550"
      type="pie"
      :options="chartOptions"
      :series="chartOptions.series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "PieChart",
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    chartOptions: Object,
  },
};
</script>
<style scoped>
button {
  background: #26e6a4;
  border: 0;
  font-size: 16px;
  color: "#fff";
  padding: 10px;
  margin-left: 28px;
}
</style>

