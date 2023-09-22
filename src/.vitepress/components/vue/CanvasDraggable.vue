<template>
  <canvas
    id="canvasElement"
    width="500"
    height="300"
    ref="canvasElement"
    :style="canvasStyle"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
// 大体过程， 通过事件监听更改Canvas画布的状态，来检测是否需要进行画布的重新绘制。
// canvasStyle属性
const canvasStyle = ref({
  cursor: "auto",
});
const imgSrc = ref<string>();
const canvasElement = ref<HTMLCanvasElement>();

// 画布的状态
const graphicsInfo = {
  IDLE: 0,
  DRAG_START: 1,
  DRAGING: 2,
};
let canvasStatus = ref<number>(graphicsInfo.IDLE);

onMounted(() => {
  const devicePixelRatio = Number(window.devicePixelRatio.toFixed(1));
  const ctx: CanvasRenderingContext2D = canvasElement.value?.getContext("2d")!;

  // 画布里面的图形位置信息
  const graphics = [
    {
      shape: "circle",
      info: {
        positionX: 250,
        positionY: 250,
        radius: 50,
      },
    },
  ];

  ctx.beginPath();
  ctx.arc(
    graphics[0].info.positionX,
    graphics[0].info.positionY,
    graphics[0].info.radius,
    0,
    Math.PI * 2,
  );
  ctx.stroke();
  ctx.closePath();

  canvasElement.value?.addEventListener("mousedown", (e) => {
    canvasStatus.value = graphicsInfo.DRAG_START;
  });

  canvasElement.value?.addEventListener("mouseup", (e) => {
    canvasStatus.value = graphicsInfo.IDLE;
  });

  canvasElement.value?.addEventListener("mouseout", (e) => {
    canvasStatus.value = graphicsInfo.IDLE;
  });

  canvasElement.value?.addEventListener("mousemove", (e) => {
    const mouseX: number = e.offsetX;
    const mouseY: number = e.offsetY;
    // 判断点击是否落在圆上
    graphics.forEach((item) => {
      const isInCircle =
        Math.sqrt((item.info.positionX - mouseX) ** 2 + (item.info.positionY - mouseY) ** 2) <
        item.info.radius;

      canvasStyle.value.cursor = "auto";

      if (!isInCircle) return;

      // 移动到拖拽的属性上时，更新鼠标指针状态
      canvasStyle.value.cursor = "pointer";

      if (canvasStatus.value === 1 || canvasStatus.value === 2) {
        item.info.positionX = e.offsetX;
        item.info.positionY = e.offsetY;
        ctx.clearRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.arc(
          graphics[0].info.positionX,
          graphics[0].info.positionY,
          graphics[0].info.radius,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
        ctx.closePath();
        canvasStatus.value = graphicsInfo.DRAGING;
      }
    });
  });

  setTimeout(() => {
    console.log(`has scale`);
  }, 3000);

  // 将Canvas内容输入到图片中，现在暂时屏蔽处理
  // imgSrc.value = canvasElement.value?.toDataURL()
});

watch(canvasStatus, (newValue) => {
  console.log(`the value has change , and the value is ${newValue}`);
});
</script>

<style scoped>
#canvasElement {
  border: solid red 1px;
}
</style>
