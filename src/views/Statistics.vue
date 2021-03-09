<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="interList" :value.sync="interval"/>
    <ol>
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li class="record" v-for="(item, index) in group.items" :key="index">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import interList from '@/constants/interList';
import typeList from '@/constants/typeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
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

  get groupList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
    //防止sort()更改原数据
    const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    //取recordList第一个
    const result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
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
    return result;
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  interList = interList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
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

  .interval-tabs-item {
    height: 42px;
  }
}
</style>