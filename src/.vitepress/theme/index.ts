import Theme from "vitepress/theme-without-fonts";
import "./index.less";
import { defineAsyncComponent } from "vue";

export default {
  extends: Theme,
  enhanceApp: async ({ app }) => {
    // @ts-ignore
    app
      .component(
        "CanvasDraggable",
        // @ts-ignore
        defineAsyncComponent(() => import("../components/vue/CanvasDraggable.vue")),
      )
      .component(
        "LetterJump",
        // @ts-ignore
        defineAsyncComponent(() => import("../components/vue/LetterJump.vue")),
      )
      .component(
        "RegExpTest",
        // @ts-ignore
        defineAsyncComponent(() => import("../components/vue/RegExpTest.vue")),
      );
  },
};
