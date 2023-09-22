<template>
  <div class="words">
    <span
      v-for="(singleWords, index) in words"
      :key="index"
      :style="{
        animationDelay: countDelayTime() + 's',
      }"
    >
      {{ singleWords }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const words = ref<String>("我只是一段文字，但是我会跳哈！");
let baseDelayTime = 0;

function countDelayTime() {
  return (baseDelayTime = baseDelayTime + 0.3);
}
</script>

<style scoped>
.words {
  color: darkgoldenrod;
}

.words span {
  transition: all 0.5s;
  animation-name: wordsJump;
  animation-duration: 1.8s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* 没有这一个貌似不能够使用？ */
  display: inline-block;
  /* transform: translateY(100px); */
}

@keyframes wordsJump {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }

  100% {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
