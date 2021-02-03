<template>
  <label class="notes">
    {{value}}
    <span class="name">备注</span>
    <input type="text"
           @input="value = $event.target.value"
           placeholder="请在此处添加备注">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  // changeInput(event: KeyboardEvent) {
  //   const input = event.target as HTMLInputElement;
  //   this.value = input.value;
  // }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    padding-right: 16px;
    background: transparent;
    border: none;
  }
}
</style>