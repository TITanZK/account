<template>
  <label class="formItem">
    <template v-if="type === 'date'">
      <input :class="{[classPrefix+'-input']:classPrefix}"
             :type="type || 'text'"
             :value="value"
             @change="onValueChanged($event.target.value)"
             :placeholder="placeholder">
      <span class="name" :class="{[classPrefix+'-form']:classPrefix}">{{ this.fieldName }}</span>
    </template>
    <template v-else>
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             :value="value"
             @change="onValueChanged($event.target.value)"
             :placeholder="placeholder">
    </template>

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
    flex-shrink: 0;
  }

  .fucking-form {
    padding-right: 0;
  }

  input {
    height: 40px;
    flex-grow: 1;
    padding-right: 16px;
    background: transparent;
    border: none;
  }

  .fucking-input {
    border: 1px solid #ccc;
    padding-right: 0;
    padding-left: 10px;
  }
}
</style>