<template>
  <label class="formItem">
    <span class="name" :class="{[classPrefix+'-form']:classPrefix}">{{ this.fieldName }}</span>
    <input :type="type || 'text'"
           :value="value"
           @change="onValueChanged($event.target.value)"
           :placeholder="placeholder">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;
  @Prop(String) classPrefix?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }
  .fucking-form{
    padding-right: 0;
  }
  input {
    height: 40px;
    flex-grow: 1;
    padding-right: 16px;
    background: transparent;
    border: none;
  }
}
</style>