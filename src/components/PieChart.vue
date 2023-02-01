<template>
  <div class="app">
    <apexcharts
      type="pie"
      :width="width"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { helpers } from "@/helpers/helpers.ts";

export default {
  name: "PieChart",
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    labels: Array,
    options: Object,
    series: Array,
    primaryColor: String,
  },
  data() {
    return {
      width: 380,
    };
  },
  mounted() {
    this.width = this.$el.parentElement.offsetWidth;
  },
  computed: {
    chartOptions() {
      return {
        ...this.options,
        labels: this.labels,
        colors: [
          "#6A49E2",
          "#353897",
          "#282B7D",
          "#1E205F",
          "#4DC68C",
          "#3DB179",
          "#24764F",
          "#1D5E3E",
          "#14472F",
          "#BAAEE4",
          "#dasdsa",
        ],
        stroke: {
          show: false,
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -36,
            },
          },
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex];
            return helpers.truncateAddress(name, 5, 5);
          },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
      };
    },
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

