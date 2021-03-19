<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
    <div class="notes-wrapper">
      <FormItem field-name="备注"
                placeholder="此处添加备注"
                :value.sync="record.notes"/>
      <FormItem type="date"
                field-name=""
                class-prefix="fucking"
                :value.sync="record.createdAt"/>
    </div>
    <Tags ref="tag" @update:value="record.tags = $event"/>
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
    tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
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
      window.alert('已保存');
      this.record.notes = '';
      (this.$refs.tag as Tags).selectedTags = [];
    } else {
      window.alert('请输入金额！');
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
  display: flex;
  justify-content: space-between;
}
</style>