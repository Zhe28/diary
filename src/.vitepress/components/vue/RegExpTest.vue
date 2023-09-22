<template>
  <div>
    <label for="default">
      <input
        type="text"
        v-model="regexpExpression"
        placeholder="正则表达式内容(实例用RegExp，别忘了转义)"
      />
      <input
        type=""
        v-model="inputValue"
        placeholder="查找的内容"
      />
    </label>
    <textarea
      v-model="outputArea"
      disabled
      rows="10"
      cols="100"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";

const regexpExpression = ref("");
const inputValue = ref("");
const outputArea = ref<RegExpExecArray | string>();

watch(regexpExpression, (newValue, oldValue) => {
  const reg = new RegExp(newValue);
  const result = reg.exec(inputValue.value);

  if (result === null) {
    outputArea.value = "error , please reinput";
  } else {
    outputArea.value = result;
  }
});
</script>

<style scoped></style>

<style scoped></style>
