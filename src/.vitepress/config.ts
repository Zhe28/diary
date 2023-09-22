import { defineConfig } from "vitepress";
import { indexBuild } from "./plugins/indexBuild";
import { sidebar } from "./generateSidebar";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { tasklist } from "@mdit/plugin-tasklist";
import { chineseSearchOptimize, pagefindPlugin } from "vitepress-plugin-pagefind";
import { attrs } from "@mdit/plugin-attrs";

const baseUrl: string = "/journal";
export default defineConfig({
  base: baseUrl,
  title: "Private Journal",
  lang: "zh-cn",
  head: [["link", { rel: "icon", href: baseUrl + "/favicon.ico" }]],
  lastUpdated: true,
  themeConfig: {
    siteTitle: "我的日记",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/HaroZe",
      },
    ],
    // search: { provider: "local" },
    sidebar: sidebar,
  },

  markdown: {
    config: (md) => {
      md.use(imgLazyload).use(tasklist, {}).use(attrs, {});
    },
  },
  // outDir: "../dist",
  vite: {
    build: {
      target: "esnext",
      emptyOutDir: true,
      assetsInlineLimit: 409600,
    },
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
      }),
      indexBuild,
    ],
  },
});
