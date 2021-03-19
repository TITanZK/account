<template>
  <div class="wrapper" ref="wrapper">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import echarts, {EChartOption} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;

  mounted() {
    const chart = echarts.init(this.$refs.wrapper);
    chart.setOption(this.options);
  }
}

</script>

<style scoped>
.wrapper{
  /*width: 100%;*/
  height: 400px;
}
</style>