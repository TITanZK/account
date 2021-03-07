import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse((window.localStorage.getItem('recordList')) || '[]');
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse((window.localStorage.getItem('tagList')) || '[]');
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复！');
      }
      const id = createId().toString();
      state.tagList.push({id, name});
      store.commit('saveTags');
      window.alert('添加成功！');
    },

    // removeTag(id: string) {
    //   let index = -1;
    //   for (let i = 0; i <= this.tagList.length; i++) {
    //     if (this.tagList[i].id === id) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   this.tagList.splice(index, 1);
    //   this.saveTags();
    //   return true;
    // },
    // updateTag(id: string, name: string) {
    //   const idList = this.tagList.map(item => item.id);
    //   if (idList.indexOf(id) >= 0) {
    //     const names = this.tagList.map(item => item.name);
    //     if (names.indexOf(name) >= 0) {
    //       return 'duplicated';
    //     } else {
    //       const tag = this.tagList.filter(item => item.id === id)[0];
    //       tag.id = tag.name = name;//id 存在bug
    //       this.saveTags();
    //       return 'success';
    //     }
    //   } else {
    //     return 'notFound';
    //   }
    // },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  },
  actions: {},
  modules: {}
});
