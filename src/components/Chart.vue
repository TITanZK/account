<template>
  <div class="wrapper" ref="wrapper">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import echarts, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  chart?: ECharts;

  mounted() {
    this.chart = echarts.init(this.$refs.wrapper);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange(newValue: EChartOption) {
    this.chart.setOption(newValue);
  }
}

</script>

<style scoped>
.wrapper {
  /*width: 100%;*/
  height: 350px;
}
</style>