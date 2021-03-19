<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <div ref="chartWrapper" class="chart-wrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <ol v-if="groupList.length>0">
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
        <ol>
          <li class="record" v-for="(item, index) in group.items" :key="index">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div class="noResult" v-else>目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';

@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {
  type = '-';
  typeList = typeList;

  mounted() {
    const div = this.$refs.chartWrapper;
    div.scrollLeft = div.scrollWidth;
  }

  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupList, {title: dateString});
      array.push({
        key: dateString,
        value: found ? found.total : 0
      });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.key);
    const values = this.keyValueList.map(item => item.value);
    return {
      tooltip: {
        show: true,
        triggerOn: 'click',
        formatter: '{c}',
        position: 'top'
      },
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        axisLine: {
          lineStyle: {color: '#666'}
        },
        axisTick: {
          alignWithLabel: true
        },
        type: 'category',
        data: keys
      },
      yAxis: {
        splitLine: false,
        axisLine: false
      },
      series: [{
        data: values,
        itemStyle: {
          color: '#666',
          borderWidth: 1
        },
        symbolSize: 14,
        symbol: 'circle',
        type: 'line',
      }]
    };
  }

  //计算属性
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    //防止sort()更改原数据
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    //取recordList第一个
    if (newList.length === 0) {return [];}
    type Result = [{ title: string; total?: number; items: RecordItem[] }]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    //和recordList里面的每一项进行比较
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beautify(value: string) {
    const day = dayjs(value);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.noResult {
  padding: 80px 16px 0;
  text-align: center;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 28px;
  color: #999;
}

::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }
}
</style>