<template>
<!--  .native修饰符也可以实现-->
  <button class="button" @click="$emit('click', $event)">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "Button"
}
</script>

<style scoped lang="scss">
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

&-wrapper {
   text-align: center;
   padding: 16px;
   margin-top: 24px;
 }
}
</style>