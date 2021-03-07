import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {
      return window.alert('标签名不可能为空！');
    }
    this.$store.commit('createTag', name);
  }
}
