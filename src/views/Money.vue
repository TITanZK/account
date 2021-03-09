<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
    <div class="notes-wrapper">
      <FormItem field-name="备注"
                placeholder="请在此处添加备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad}
})

export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  typeList = typeList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord(value: string) {
    if (value !== '0' && value !== '0.') {
      this.$store.commit('createRecord', this.record);
    }

  }
}
</script>

<style scoped lang="scss">
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes-wrapper {
  padding: 12px 0;
}
</style>